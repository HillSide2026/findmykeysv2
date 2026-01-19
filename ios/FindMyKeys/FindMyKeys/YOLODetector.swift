import CoreML
import Foundation
import Vision

actor YOLODetector {
    private static var hasLoggedMissingModel = false
    private let vnModel: VNCoreMLModel?
    /// Configure these once you know exact YOLO label strings.
    private let allowedLabels: Set<String>
    let isAvailable: Bool

    init(modelName: String = "FindMyKeysYOLO", allowedLabels: Set<String> = []) {
        self.allowedLabels = allowedLabels

        guard let url = Bundle.main.url(forResource: modelName, withExtension: "mlmodelc") else {
            self.vnModel = nil
            self.isAvailable = false
            YOLODetector.logMissingModelOnce()
            return
        }

        do {
            let mlModel = try MLModel(contentsOf: url)
            self.vnModel = try VNCoreMLModel(for: mlModel)
            self.isAvailable = true
        } catch {
            self.vnModel = nil
            self.isAvailable = false
            YOLODetector.logMissingModelOnce()
        }
    }

    func detect(pixelBuffer: CVPixelBuffer) throws -> [Detection] {
        guard isAvailable, let vnModel else {
            return []
        }

        let request = VNCoreMLRequest(model: vnModel)
        request.imageCropAndScaleOption = .scaleFill

        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .up, options: [:])
        try handler.perform([request])

        guard let results = request.results as? [VNRecognizedObjectObservation] else {
            return []
        }

        let detections: [Detection] = results.compactMap { obs in
            guard let top = obs.labels.first else { return nil }
            let label = top.identifier
            let conf = top.confidence

            if !allowedLabels.isEmpty, !allowedLabels.contains(label) { return nil }

            return Detection(label: label, confidence: conf, boundingBox: obs.boundingBox)
        }

        return detections
    }

    private static func logMissingModelOnce() {
        guard !hasLoggedMissingModel else { return }
        hasLoggedMissingModel = true
        print("Model not found; detection disabled.")
    }
}
