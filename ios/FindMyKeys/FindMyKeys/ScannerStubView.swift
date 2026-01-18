import SwiftUI

struct ScannerStubView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                Text("Scanner (Stage 0)")
                    .font(.title2).bold()

                Text("Camera preview and detection are added in Stage 1–2.\nFor now, this confirms permissions + navigation.")
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)

                Spacer()
            }
            .padding()
            .navigationTitle("Scan")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Close") { dismiss() }
                }
            }
        }
    }
}
