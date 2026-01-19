import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        VStack(spacing: 20) {
            Text("FindMyKeys")
                .font(.largeTitle).bold()

            Text("Point your camera around your space to find missing items.")
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
                .padding(.horizontal)

            HStack(spacing: 8) {
                Text("Looking for:")
                    .font(.subheadline.weight(.semibold))
                Text(appState.selectedTarget.displayName)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            NavigationLink {
                ItemsView()
            } label: {
                Text("Choose items")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.bordered)
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
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                NavigationLink {
                    SettingsView()
                } label: {
                    Image(systemName: "gearshape")
                }
            }
        }
    }
}
