import SwiftUI

struct HomeView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject private var appState: AppState

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Text("FindMyKeys")
                    .font(.largeTitle).bold()

                Text("Point your camera around your space to find missing items.")
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)

                VStack(alignment: .leading, spacing: 12) {
                    Text("Current item")
                        .font(.headline)

                    Text(appState.selectedItemDisplayName)
                        .font(.title3.weight(.semibold))
                        .foregroundStyle(appState.selectedItemId == nil ? .secondary : .primary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                VStack(spacing: 12) {
                    NavigationLink {
                        ItemsView()
                    } label: {
                        Text("Choose Item")
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.bordered)

                    NavigationLink {
                        SettingsView()
                    } label: {
                        Text("Settings")
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.bordered)
                }
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
                NavigationLink {
                    ScanView()
                } label: {
                    Text("Start Scan")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .padding(.horizontal)

                Spacer(minLength: 20)
            }
            .padding()
        }
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
