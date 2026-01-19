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
    @Published var audioEnabled: Bool {
        didSet {
            UserDefaults.standard.set(audioEnabled, forKey: Keys.audioEnabled)
        }
    }

    @Published var hapticsEnabled: Bool {
        didSet {
            UserDefaults.standard.set(hapticsEnabled, forKey: Keys.hapticsEnabled)
        }
    }

    @Published var sensitivity: Double {
        didSet {
            UserDefaults.standard.set(sensitivity, forKey: Keys.sensitivity)
        }
    }

    init() {
        let defaults = UserDefaults.standard
        audioEnabled = defaults.object(forKey: Keys.audioEnabled) as? Bool ?? true
        hapticsEnabled = defaults.object(forKey: Keys.hapticsEnabled) as? Bool ?? true
        sensitivity = defaults.object(forKey: Keys.sensitivity) as? Double ?? 0.5
    }

    private enum Keys {
        static let audioEnabled = "preferences.audioEnabled"
        static let hapticsEnabled = "preferences.hapticsEnabled"
        static let sensitivity = "preferences.sensitivity"
    }
}
