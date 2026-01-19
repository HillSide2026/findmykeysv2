import SwiftUI

enum TargetItem: String, CaseIterable, Identifiable {
    case backpack
    case bottle
    case book
    case remote
    case handbag
    case cup
    case keys
    case wallet

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .backpack:
            return "Backpack"
        case .bottle:
            return "Bottle"
        case .book:
            return "Book"
        case .remote:
            return "Remote"
        case .handbag:
            return "Handbag"
        case .cup:
            return "Cup"
        case .keys:
            return "Keys"
        case .wallet:
            return "Wallet"
        }
    }

    var isBeta: Bool {
        switch self {
        case .keys, .wallet:
            return true
        default:
            return false
        }
    }
}

final class AppState: ObservableObject {
    @Published var selectedItemId: String?
    @Published var selectedItemDisplayName: String

    let supportedItems: [TargetItem] = TargetItem.allCases

    private let selectionKey = "selectedItemId"

    init() {
        if let savedValue = UserDefaults.standard.string(forKey: selectionKey),
           let savedTarget = TargetItem(rawValue: savedValue) {
            selectedItemId = savedTarget.id
            selectedItemDisplayName = savedTarget.displayName
        } else {
            selectedItemId = nil
            selectedItemDisplayName = "Choose an item"
        }
    }

    func setTarget(_ item: TargetItem) {
        selectedItemId = item.id
        selectedItemDisplayName = item.displayName
        UserDefaults.standard.set(item.id, forKey: selectionKey)
    }
}
