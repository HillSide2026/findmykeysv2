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
                permissionContent
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
        .onAppear {
            Task {
                await requestAndStart()
            }
        }
        .onDisappear {
            camera.stopSession()
        }
    }

    @ViewBuilder
    private var permissionContent: some View {
        switch camera.authorizationStatus {
        case .denied, .restricted:
            PermissionDeniedView(
                openSettings: openSettings,
                dismiss: { self.dismiss() }
            )
        case .notDetermined:
            VStack(spacing: 16) {
                Text("Requesting Camera Access")
                    .font(.title2).bold()
                Text("Please respond to the system prompt to continue.")
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)
                ProgressView()
            }
            .padding()
        default:
            EmptyView()
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
