import SwiftUI

@main
struct FindMyKeysApp: App {
    @StateObject private var appState = AppState()
    @StateObject private var preferences = Preferences()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
                .environmentObject(preferences)
        }
    }
}
