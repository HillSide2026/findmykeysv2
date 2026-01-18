import SwiftUI

struct WhatThisDoesView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                Text("What this app does")
                    .font(.title2).bold()

                Text("Find My Keys helps you locate common items by scanning what your camera sees and highlighting matching objects.")

                Text("Privacy")
                    .font(.headline)
                    .padding(.top, 8)

                Text("• The scan runs on your device.\n• The app does not upload or save your camera images.\n• No background scanning.")
                    .fixedSize(horizontal: false, vertical: true)

                Text("How to use it")
                    .font(.headline)
                    .padding(.top, 8)

                Text("Tap “Start Scan”, allow camera access, and point your phone at the area where you think the item might be.")
            }
            .padding()
        }
        .navigationTitle("About")
    }
}
