import SwiftUI

enum TargetItem: String, CaseIterable, Identifiable {
    case backpack, bottle, book, remote, handbag
    case keys, wallet
    case cup

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .keys:
            return "Keys (Beta)"
        case .wallet:
            return "Wallet (Beta)"
        default:
            return rawValue.capitalized
        }
    }

    var systemImage: String {
        switch self {
        case .backpack:
            return "backpack"
        case .bottle:
            return "drop.fill"
        case .book:
            return "book"
        case .remote:
            return "tv"
        case .handbag:
            return "handbag"
        case .keys:
            return "key.fill"
        case .wallet:
            return "wallet.pass.fill"
        case .cup:
            return "cup.and.saucer"
        }
    }
}

final class AppState: ObservableObject {
    @Published var selectedTarget: TargetItem {
        didSet { save() }
    }

    init() {
        if let raw = UserDefaults.standard.string(forKey: "selectedTargetItem"),
           let item = TargetItem(rawValue: raw) {
            self.selectedTarget = item
        } else {
            self.selectedTarget = .backpack
        }
    }

    private func save() {
        UserDefaults.standard.set(selectedTarget.rawValue, forKey: "selectedTargetItem")
    }
}
