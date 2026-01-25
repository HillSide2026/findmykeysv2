import AVFoundation
import SwiftUI

struct ScanView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var appState: AppState
    @StateObject private var camera = CameraManager()
    @EnvironmentObject var appState: AppState

    var body: some View {
        ZStack {
            if camera.authorizationStatus == .authorized {
                CameraPreviewView(session: camera.session)
                    .ignoresSafeArea()
            } else if camera.lastError == nil {
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

                if camera.isRunning {
                    Text("Camera Ready")
                        .font(.caption.weight(.semibold))
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(.ultraThinMaterial)
                        .clipShape(Capsule())
                        .padding(.top, 8)
                }

                Text("Auth: \(String(describing: AVCaptureDevice.authorizationStatus(for: .video)))")
                    .font(.caption2.weight(.semibold))
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(.ultraThinMaterial)
                    .clipShape(Capsule())
                    .padding(.top, camera.isRunning ? 4 : 8)

                Text("Target: \(appState.selectedTarget.displayName)")
                    .font(.caption.weight(.semibold))
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(.ultraThinMaterial)
                    .clipShape(Capsule())
                    .padding(.top, camera.isRunning ? 4 : 8)
                    .padding(.top, 8)

                Spacer()
            }

            if let lastError = camera.lastError {
                errorOverlay(message: lastError)
            } else if camera.authorizationStatus == .authorized && !camera.isRunning {
                startingOverlay
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

    @ViewBuilder
    private func errorOverlay(message: String) -> some View {
        VStack(spacing: 12) {
            Text("Camera unavailable")
                .font(.title3.bold())
            Text(message)
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
            if camera.authorizationStatus == .denied {
                Button("Open Settings") {
                    openSettings()
                }
                .buttonStyle(.borderedProminent)
            }
        }
        .padding(24)
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
        .padding()
    }

    private var startingOverlay: some View {
        VStack(spacing: 12) {
            Text("Starting camera…")
                .font(.title3.bold())
            ProgressView()
        }
        .padding(24)
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
        .padding()
    }

    private func openSettings() {
        guard let url = URL(string: UIApplication.openSettingsURLString) else { return }
        UIApplication.shared.open(url)
    }
}
