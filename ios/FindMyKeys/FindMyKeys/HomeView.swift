import SwiftUI
import AVFoundation

struct HomeView: View {
    @State private var showScannerStub = false
    @State private var showPermissionError = false

    var body: some View {
        VStack(spacing: 20) {
            Text("Find My Keys")
                .font(.largeTitle).bold()

            Text("Choose an item, scan with your camera, and get feedback when it’s visible.")
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
                .padding(.horizontal)

            Button {
                requestCameraPermissionThenOpen()
            } label: {
                Text("Start Scan")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .padding(.horizontal)

            NavigationLink("What this does", destination: WhatThisDoesView())
                .padding(.top, 8)

            Spacer()
        }
        .padding()
        .navigationTitle("Home")
        .sheet(isPresented: $showScannerStub) {
            ScannerStubView()
        }
        .alert("Camera Access Needed", isPresented: $showPermissionError) {
            Button("OK", role: .cancel) {}
        } message: {
            Text("Please allow camera access to scan for items.")
        }
    }

    private func requestCameraPermissionThenOpen() {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            showScannerStub = true
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video) { granted in
                DispatchQueue.main.async {
                    if granted {
                        showScannerStub = true
                    } else {
                        showPermissionError = true
                    }
                }
            }
        case .denied, .restricted:
            showPermissionError = true
        @unknown default:
            showPermissionError = true
        }
    }
}
