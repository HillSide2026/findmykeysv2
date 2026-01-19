# iOS (Stage 0)

Open `FindMyKeys.xcodeproj` in Xcode (iOS 16+).

## What works
- Home screen + About screen
- Camera permission is requested only when you tap "Start Scan"
- No networking / uploads

## Notes
- Camera preview + detection are added in later stages.

## CoreML model status
The CoreML model is currently disabled in the build because the checked-in mlpackage manifest is invalid. To enable detection, replace it with a valid `.mlmodel`/`.mlpackage` and re-add it to target membership in Xcode.
