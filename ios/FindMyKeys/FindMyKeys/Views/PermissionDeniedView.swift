import SwiftUI

struct PermissionDeniedView: View {
    let openSettings: () -> Void
    let dismiss: () -> Void

    var body: some View {
        VStack(spacing: 16) {
            Text("Camera Access Needed")
                .font(.title2).bold()
            Text("To scan, allow camera access in Settings.")
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
            Button("Open Settings") {
                openSettings()
            }
            .buttonStyle(.borderedProminent)
            Button("Not now") {
                dismiss()
            }
        }
        .padding()
    }
}
