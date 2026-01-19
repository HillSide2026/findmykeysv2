import SwiftUI

struct HomeView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Find My Keys")
                .font(.largeTitle).bold()

            Text("On-device detection. No data leaves your phone.")
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
                .padding(.horizontal)

            NavigationLink {
                ScanView()
            } label: {
                Text("Start Scan")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .padding(.horizontal)

            Spacer()
        }
        .padding()
        .navigationTitle("Home")
    }
}
