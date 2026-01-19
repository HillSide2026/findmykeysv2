import SwiftUI

struct HomeView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Find My Keys")
                .font(.largeTitle).bold()

            Text("Point your camera around your space to find missing items.")
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
                .padding(.horizontal)

            NavigationLink {
                ScanView()
            } label: {
                Text("Start scanning")
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
