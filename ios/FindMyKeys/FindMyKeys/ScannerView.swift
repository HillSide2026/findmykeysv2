import SwiftUI

struct ScannerView: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var camera = CameraService()

    var body: some View {
        NavigationStack {
            ZStack {
                if let msg = camera.errorMessage {
                    VStack(spacing: 12) {
                        Text("Camera Unavailable")
                            .font(.title2).bold()
                        Text(msg)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding()
                } else {
                    CameraPreview(session: camera.session)
                        .ignoresSafeArea()
                    DetectionOverlayView(detections: camera.detections)
                        .ignoresSafeArea()
                }

                VStack {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Scanning…")
                            Text("FPS: \(camera.fps, specifier: "%.1f")")
                            Text("Frames: \(camera.frameCount)")
                        }
                        .padding(10)
                        .background(.ultraThinMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        Spacer()
                    }
                    .padding()

                    if let modelError = camera.modelError {
                        Text(modelError)
                            .font(.callout).bold()
                            .padding(10)
                            .frame(maxWidth: .infinity)
                            .background(.ultraThinMaterial)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                            .padding(.horizontal)
                    }

                    Spacer()
                }
            }
            .navigationTitle("Scan")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Close") { dismiss() }
                }
            }
            .onAppear { camera.start() }
            .onDisappear { camera.stop() }
        }
    }
}
