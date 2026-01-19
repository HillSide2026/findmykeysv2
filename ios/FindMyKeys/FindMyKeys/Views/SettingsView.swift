import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var preferences: Preferences

    var body: some View {
        Form {
            Section("Feedback") {
                Toggle("Audio ping", isOn: $preferences.audioEnabled)
                Toggle("Haptics", isOn: $preferences.hapticsEnabled)
            }

            Section("Detection") {
                VStack(alignment: .leading, spacing: 8) {
                    Slider(value: $preferences.sensitivity, in: 0.2...0.9, step: 0.05)
                    Text("Sensitivity: \(preferences.sensitivity, specifier: "%.2f")")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                    Text("Higher = fewer detections")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
                .padding(.vertical, 4)
            } footer: {
                Text("All processing stays on device.")
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
