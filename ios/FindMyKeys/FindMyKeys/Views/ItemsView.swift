import SwiftUI

struct ItemsView: View {
    @EnvironmentObject private var appState: AppState

    private let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(appState.supportedItems) { item in
                    Button {
                        appState.setTarget(item)
                    } label: {
                        VStack(spacing: 10) {
                            Text(item.displayName)
                                .font(.headline)

                            if item.isBeta {
                                Text("BETA")
                                    .font(.caption2.weight(.bold))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(
                                        Capsule()
                                            .fill(Color.orange.opacity(0.2))
                                    )
                                    .foregroundStyle(Color.orange)
                            }

                            if appState.selectedItemId == item.id {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundStyle(Color.accentColor)
                            }
                        }
                        .frame(maxWidth: .infinity, minHeight: 90)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 14)
                                .fill(appState.selectedItemId == item.id ? Color.accentColor.opacity(0.15) : Color(uiColor: .secondarySystemBackground))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 14)
                                .stroke(appState.selectedItemId == item.id ? Color.accentColor : Color.clear, lineWidth: 2)
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding()
        }
        .navigationTitle("Choose Item")
    }
}
