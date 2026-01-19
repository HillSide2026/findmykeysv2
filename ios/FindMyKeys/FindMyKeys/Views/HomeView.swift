import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var appState: AppState

    private let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

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
                    Text("What are you looking for?")
                        .font(.headline)

                    LazyVGrid(columns: columns, spacing: 16) {
                        ForEach(TargetItem.allCases) { item in
                            Button {
                                appState.setTarget(item)
                            } label: {
                                VStack(spacing: 8) {
                                    Image(systemName: item.systemImage)
                                        .font(.title2)
                                    Text(item.displayName)
                                        .font(.subheadline.weight(.semibold))
                                }
                                .frame(maxWidth: .infinity, minHeight: 90)
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 14)
                                        .fill(item == appState.selectedTarget ? Color.accentColor.opacity(0.15) : Color(uiColor: .secondarySystemBackground))
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14)
                                        .stroke(item == appState.selectedTarget ? Color.accentColor : Color.clear, lineWidth: 2)
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                NavigationLink {
                    ScanView()
                } label: {
                    Text("Start scanning")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .padding(.horizontal)

                Spacer(minLength: 20)
            }
            .padding()
        }
        .navigationTitle("Home")
    }
}
