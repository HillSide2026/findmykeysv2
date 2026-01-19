import AVFoundation
import SwiftUI

struct ScanView: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var camera = CameraManager()

    var body: some View {
        ZStack {
            if camera.authorizationStatus == .authorized {
                CameraPreviewView(session: camera.session)
                    .ignoresSafeArea()
            } else {
                VStack(spacing: 16) {
                    Text("Camera Access Needed")
                        .font(.title2).bold()
                    Text("Enable camera access to show the live preview.")
                        .multilineTextAlignment(.center)
                        .foregroundStyle(.secondary)

                    if camera.authorizationStatus == .denied || camera.authorizationStatus == .restricted {
                        Button("Open Settings") {
                            openSettings()
                        }
                        .buttonStyle(.borderedProminent)
                    } else {
                        Button("Enable Camera") {
                            Task {
                                await requestAndStart()
                            }
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
                .padding()
            }

            VStack {
                HStack {
                    Button {
                        dismiss()
                    } label: {
                        Image(systemName: "xmark")
                            .font(.headline)
                            .padding(10)
                            .background(.ultraThinMaterial)
                            .clipShape(Circle())
                    }

                    Spacer()
                }
                .padding([.top, .leading])

                if camera.isSessionRunning {
                    Text("Camera Ready")
                        .font(.caption.weight(.semibold))
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(.ultraThinMaterial)
                        .clipShape(Capsule())
                        .padding(.top, 8)
                }

                Spacer()
            }
        }
        .navigationBarBackButtonHidden(true)
        .task {
            await requestAndStart()
        }
        .onDisappear {
            camera.stopSession()
        }
    }

    @MainActor
    private func requestAndStart() async {
        let authorized = await camera.requestAccessIfNeeded()
        guard authorized else { return }
        camera.configureSession()
        camera.startSession()
    }

    private func openSettings() {
        guard let url = URL(string: UIApplication.openSettingsURLString) else { return }
        UIApplication.shared.open(url)
    }
}
