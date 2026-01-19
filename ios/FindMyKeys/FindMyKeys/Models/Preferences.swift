import SwiftUI

final class Preferences: ObservableObject {
    @Published var audioEnabled: Bool { didSet { save() } }
    @Published var hapticsEnabled: Bool { didSet { save() } }
    @Published var sensitivity: Double { didSet { save() } }

    init() {
        let defaults = UserDefaults.standard
        self.audioEnabled = defaults.object(forKey: "pref_audioEnabled") as? Bool ?? true
        self.hapticsEnabled = defaults.object(forKey: "pref_hapticsEnabled") as? Bool ?? true
        self.sensitivity = defaults.object(forKey: "pref_sensitivity") as? Double ?? 0.5
    }

    private func save() {
        let defaults = UserDefaults.standard
        defaults.set(audioEnabled, forKey: "pref_audioEnabled")
        defaults.set(hapticsEnabled, forKey: "pref_hapticsEnabled")
        defaults.set(min(max(sensitivity, 0.2), 0.9), forKey: "pref_sensitivity")
    }
}
