import SwiftUI

struct DetectionOverlayView: View {
    let detections: [Detection]

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(detections) { det in
                    let rect = visionRectToViewRect(det.boundingBox, in: geo.size)

                    Rectangle()
                        .stroke(Color.green, lineWidth: 2)
                        .frame(width: rect.width, height: rect.height)
                        .position(x: rect.midX, y: rect.midY)

                    Text("\(det.label) \(Int(det.confidence * 100))%")
                        .font(.caption2).bold()
                        .padding(6)
                        .background(.ultraThinMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                        .position(x: rect.minX + 60, y: max(12, rect.minY - 10))
                }
            }
        }
        .allowsHitTesting(false)
    }

    /// Vision boundingBox: normalized, origin bottom-left.
    /// This converts to SwiftUI view coords assuming the preview fills the view (aspectFill).
    private func visionRectToViewRect(_ bbox: CGRect, in size: CGSize) -> CGRect {
        // Convert to top-left origin normalized
        let x = bbox.origin.x
        let y = 1.0 - bbox.origin.y - bbox.size.height
        let w = bbox.size.width
        let h = bbox.size.height

        return CGRect(
            x: x * size.width,
            y: y * size.height,
            width: w * size.width,
            height: h * size.height
        )
    }
}
