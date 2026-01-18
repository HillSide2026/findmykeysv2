import AVFoundation
import Foundation

final class CameraService: NSObject, ObservableObject, AVCaptureVideoDataOutputSampleBufferDelegate {
    let session = AVCaptureSession()
    private let sessionQueue = DispatchQueue(label: "camera.session.queue")
    private let videoOutputQueue = DispatchQueue(label: "camera.video.output.queue")
    private let videoOutput = AVCaptureVideoDataOutput()

    @Published var isRunning: Bool = false
    @Published var errorMessage: String? = nil
    @Published var fps: Double = 0
    @Published var frameCount: Int = 0
    @Published var detections: [Detection] = []
    @Published var modelError: String? = nil

    private var isConfigured = false
    private var configurationError: String? = nil
    private var lastFPSUpdateTime: CMTime?
    private var framesSinceLastUpdate: Int = 0
    private var totalFrames: Int = 0
    private var detector: YOLODetector?
    private var lastInferenceTime = CFAbsoluteTimeGetCurrent()

    private func configureIfNeeded() {
        guard !isConfigured else { return }
        isConfigured = true

        session.beginConfiguration()
        session.sessionPreset = .high

        // Input
        guard let device = AVCaptureDevice.default(
            .builtInWideAngleCamera,
            for: .video,
            position: .back
        ) else {
            session.commitConfiguration()
            configurationError = "No camera available on this device."
            DispatchQueue.main.async { [weak self] in
                self?.errorMessage = "No camera available on this device."
            }
            return
        }

        do {
            let input = try AVCaptureDeviceInput(device: device)
            if session.canAddInput(input) { session.addInput(input) }
        } catch {
            session.commitConfiguration()
            configurationError = "Failed to access camera input."
            DispatchQueue.main.async { [weak self] in
                self?.errorMessage = "Failed to access camera input."
            }
            return
        }

        // Output (no processing yet; Stage 2 will use VideoDataOutput)
        videoOutput.alwaysDiscardsLateVideoFrames = true
        videoOutput.videoSettings = [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
        ]
        videoOutput.setSampleBufferDelegate(self, queue: videoOutputQueue)
        if session.canAddOutput(videoOutput) { session.addOutput(videoOutput) }

        session.commitConfiguration()
    }

    func start() {
        sessionQueue.async { [weak self] in
            guard let self else { return }
            self.configureIfNeeded()
            guard self.configurationError == nil else { return }
            if !self.session.isRunning {
                self.session.startRunning()
                DispatchQueue.main.async { [weak self] in
                    self?.isRunning = true
                }
            }
        }
    }

    func stop() {
        sessionQueue.async { [weak self] in
            guard let self else { return }
            if self.session.isRunning {
                self.session.stopRunning()
                DispatchQueue.main.async { [weak self] in
                    self?.isRunning = false
                }
            }
        }
    }

    func captureOutput(
        _ output: AVCaptureOutput,
        didOutput sampleBuffer: CMSampleBuffer,
        from connection: AVCaptureConnection
    ) {
        let timestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
        framesSinceLastUpdate += 1
        totalFrames += 1
        let currentFrameCount = totalFrames

        DispatchQueue.main.async { [weak self] in
            self?.frameCount = currentFrameCount
        }

        if let lastTime = lastFPSUpdateTime {
            let delta = CMTimeGetSeconds(timestamp - lastTime)
            if delta >= 0.5, delta > 0 {
                let currentFPS = Double(framesSinceLastUpdate) / delta
                framesSinceLastUpdate = 0
                lastFPSUpdateTime = timestamp
                DispatchQueue.main.async { [weak self] in
                    self?.fps = currentFPS
                }
            }
        } else {
            lastFPSUpdateTime = timestamp
        }

        let now = CFAbsoluteTimeGetCurrent()
        guard now - lastInferenceTime >= 0.15 else { return }
        lastInferenceTime = now

        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }

        Task.detached { [weak self] in
            guard let self else { return }
            do {
                let dets = try await self.runDetection(pixelBuffer: pixelBuffer)
                await MainActor.run {
                    self.modelError = nil
                    self.detections = dets
                }
            } catch YOLODetector.DetectorError.modelNotFound {
                await MainActor.run {
                    self.modelError = "Model not found. Add FindMyKeysYOLO.mlpackage to the app bundle."
                    self.detections = []
                }
            } catch {
                await MainActor.run {
                    self.modelError = "Detection failed."
                }
            }
        }
    }

    private func runDetection(pixelBuffer: CVPixelBuffer) async throws -> [Detection] {
        if detector == nil {
            detector = try YOLODetector()
        }

        guard let detector else {
            return []
        }

        return try await detector.detect(pixelBuffer: pixelBuffer)
    }
}
