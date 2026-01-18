import CoreML
import Foundation
import Vision

actor YOLODetector {
    enum DetectorError: Error {
        case modelNotFound
        case modelLoadFailed
    }

    private let vnModel: VNCoreMLModel
    /// Configure these once you know exact YOLO label strings.
    private let allowedLabels: Set<String>

    init(modelName: String = "FindMyKeysYOLO", allowedLabels: Set<String> = []) throws {
        self.allowedLabels = allowedLabels

        guard let url = Bundle.main.url(forResource: modelName, withExtension: "mlpackage") ??
            Bundle.main.url(forResource: modelName, withExtension: "mlmodelc") else {
            throw DetectorError.modelNotFound
        }

        let mlModel: MLModel
        do {
            mlModel = try MLModel(contentsOf: url)
        } catch {
            throw DetectorError.modelLoadFailed
        }

        self.vnModel = try VNCoreMLModel(for: mlModel)
    }

    func detect(pixelBuffer: CVPixelBuffer) throws -> [Detection] {
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
}
