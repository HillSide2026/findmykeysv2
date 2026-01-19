import SwiftUI

enum TargetItem: String, CaseIterable, Identifiable {
    case backpack
    case bottle
    case book
    case remote
    case handbag
    case phone
    case laptop
    case cup

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
        case .phone:
            return "Phone"
        case .laptop:
            return "Laptop"
        case .cup:
            return "Cup"
        }
    }

    var systemImage: String {
        switch self {
        case .backpack:
            return "backpack"
        case .bottle:
            return "drop"
        case .book:
            return "book"
        case .remote:
            return "tv"
        case .handbag:
            return "handbag"
        case .phone:
            return "iphone"
        case .laptop:
            return "laptopcomputer"
        case .cup:
            return "cup.and.saucer"
        }
    }
}

final class AppState: ObservableObject {
    @Published var selectedTarget: TargetItem

    private let selectionKey = "selectedTargetItem"

    init() {
        if let savedValue = UserDefaults.standard.string(forKey: selectionKey),
           let savedTarget = TargetItem(rawValue: savedValue) {
            selectedTarget = savedTarget
        } else {
            selectedTarget = .backpack
        }
    }

    func setTarget(_ item: TargetItem) {
        selectedTarget = item
        UserDefaults.standard.set(item.rawValue, forKey: selectionKey)
    }
}
