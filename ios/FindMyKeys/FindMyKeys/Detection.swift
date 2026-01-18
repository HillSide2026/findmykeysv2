import CoreGraphics
import Foundation

struct Detection: Identifiable, Equatable {
    let id = UUID()
    let label: String
    let confidence: Float
    /// Normalized rect in Vision coordinates (origin bottom-left), 0..1
    let boundingBox: CGRect
}
