import SwiftUI

struct ItemsView: View {
    @EnvironmentObject var appState: AppState

    private let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(TargetItem.allCases) { item in
                    Button {
                        appState.selectedTarget = item
                    } label: {
                        VStack(spacing: 12) {
                            Image(systemName: item.systemImage)
                                .font(.system(size: 28, weight: .semibold))
                            Text(item.displayName)
                                .font(.headline)
                                .multilineTextAlignment(.center)
                        }
                        .frame(maxWidth: .infinity, minHeight: 120)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 16)
                                .fill(appState.selectedTarget == item ? Color.accentColor.opacity(0.15) : Color(.secondarySystemBackground))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(appState.selectedTarget == item ? Color.accentColor : Color.clear, lineWidth: 2)
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding()
        }
        .navigationTitle("Items")
    }
}
