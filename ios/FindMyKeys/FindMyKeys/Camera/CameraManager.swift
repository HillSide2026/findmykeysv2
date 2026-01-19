import AVFoundation
import SwiftUI

final class CameraManager: NSObject, ObservableObject {
    @Published var authorizationStatus: AVAuthorizationStatus
    @Published var isRunning: Bool = false
    @Published var lastError: String?

    let session = AVCaptureSession()
    private let sessionQueue = DispatchQueue(label: "camera.session.queue")
    private var isConfigured = false

    override init() {
        authorizationStatus = AVCaptureDevice.authorizationStatus(for: .video)
        super.init()
    }

    func requestAccessIfNeeded() async -> Bool {
        let currentStatus = AVCaptureDevice.authorizationStatus(for: .video)
        await MainActor.run {
            authorizationStatus = currentStatus
        }

        if currentStatus == .notDetermined {
            print("Camera permission status not determined. Requesting access.")
            let granted = await withCheckedContinuation { continuation in
                AVCaptureDevice.requestAccess(for: .video) { allowed in
                    continuation.resume(returning: allowed)
                }
            }
            let updatedStatus = AVCaptureDevice.authorizationStatus(for: .video)
            await MainActor.run {
                authorizationStatus = updatedStatus
            }
            if granted {
                print("Camera permission granted.")
            } else {
                print("Camera permission denied.")
                await MainActor.run {
                    lastError = "Camera access denied. Enable access in Settings."
                }
            }
            return granted
        }

        if currentStatus == .authorized {
            print("Camera permission already authorized.")
        } else {
            print("Camera permission not authorized: \(currentStatus.rawValue)")
            await MainActor.run {
                lastError = "Camera access denied. Enable access in Settings."
            }
        }
        return currentStatus == .authorized
    }

    func configureSession() {
        guard authorizationStatus == .authorized else { return }
        sessionQueue.async { [weak self] in
            guard let self, !self.isConfigured else { return }

            print("Camera configureSession started.")
            Task { @MainActor in
                self.lastError = nil
            }
            self.session.beginConfiguration()
            self.session.sessionPreset = .high

            guard let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back) else {
                Task { @MainActor in
                    self.lastError = "No camera device available (Simulator?)"
                }
                self.session.commitConfiguration()
                print("Camera configureSession failed: no device.")
                return
            }
            print("Camera device selected: \(device.localizedName) (\(device.position.rawValue))")

            do {
                let input = try AVCaptureDeviceInput(device: device)
                if self.session.canAddInput(input) {
                    self.session.addInput(input)
                } else {
                    Task { @MainActor in
                        self.lastError = "Unable to add camera input to session."
                    }
                    self.session.commitConfiguration()
                    print("Camera configureSession failed: cannot add input.")
                    return
                }
            } catch {
                Task { @MainActor in
                    self.lastError = error.localizedDescription
                }
                self.session.commitConfiguration()
                print("Camera configureSession failed: \(error.localizedDescription)")
                return
            }

            let output = AVCaptureVideoDataOutput()
            output.alwaysDiscardsLateVideoFrames = true
            output.videoSettings = [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]

            if self.session.canAddOutput(output) {
                self.session.addOutput(output)
            } else {
                Task { @MainActor in
                    self.lastError = "Unable to add camera output to session."
                }
                self.session.commitConfiguration()
                print("Camera configureSession failed: cannot add output.")
                return
            }

            self.session.commitConfiguration()
            self.isConfigured = true
            print("Camera configureSession completed.")
        }
    }

    func startSession() {
        guard authorizationStatus == .authorized else { return }
        sessionQueue.async { [weak self] in
            guard let self else { return }
            print("Camera startSession called.")
            if !self.session.isRunning {
                self.session.startRunning()
            }
            let running = self.session.isRunning
            print("Camera session running state: \(running)")
            Task { @MainActor in
                self.isRunning = running
            }
        }
    }

    func stopSession() {
        sessionQueue.async { [weak self] in
            guard let self else { return }
            if self.session.isRunning {
                self.session.stopRunning()
            }
            Task { @MainActor in
                self.isRunning = false
            }
            print("Camera session stopped.")
        }
    }
}
