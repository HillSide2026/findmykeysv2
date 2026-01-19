import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var preferences: Preferences

    var body: some View {
        Form {
            Section("Alerts") {
                Toggle("Audio Ping", isOn: $preferences.audioEnabled)
                Toggle("Haptics", isOn: $preferences.hapticsEnabled)
            }

            Section("Sensitivity") {
                VStack(alignment: .leading, spacing: 8) {
                    Slider(value: $preferences.sensitivity, in: 0...1)
                    HStack {
                        Text("Low")
                        Spacer()
                        Text("High")
                    }
                    .font(.caption)
                    .foregroundStyle(.secondary)
                }
                .padding(.vertical, 4)
            }
        }
        .navigationTitle("Settings")
    }
}
