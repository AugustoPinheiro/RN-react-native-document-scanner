# react-native-document-scanner

## Preview

### iOS

![iOS Preview](./preview-ios.gif)

### Android
 
- [ ] TODO

### Mostly automatic installation

`$ react-native link react-native-document-scanner`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-document-scanner` and add `RNDocumentScanner.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNDocumentScanner.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Add OpenCV in your `Podfile` :
   ```
   ...
     # Pods for [your project]
     pod 'libopencv-contrib', '~> 3.4.1'
   end
   ```
5. Run `pod install` in your ios folder
6. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.ubidreams.RNDocumentScanner.RNDocumentScannerPackage;` to the imports at the top of the file
- Add `new RNDocumentScannerPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-document-scanner'
   project(':react-native-document-scanner').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-document-scanner/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     compile project(':react-native-document-scanner')
   ```

## Dependencies

- [React Native Camera](https://react-native-community.github.io/react-native-camera/docs/installation)
- [React Native SVG](https://github.com/react-native-community/react-native-svg#installation)

## Usage

```javascript
import RNDocumentScanner from 'react-native-document-scanner'

render () {
  return (
    <View style={styles.container}>
      <RNDocumentScanner />
    </View>
  )
}
```

## Credits

- for iOS : [SmartCrop](https://github.com/kronik/smartcrop)
- for Android : [SimpleDocumentScanner-Android](https://github.com/jbttn/SimpleDocumentScanner-Android), [OpenCV rewrite by Java](https://github.com/kongzaohui/OpenCV) and [LiveEdgeDetection](https://github.com/adityaarora1/LiveEdgeDetection)
- for image cropper component : [react-native-perspective-image-cropper](https://github.com/Michaelvilleneuve/react-native-perspective-image-cropper)

## TODO

- [ ] Support for landscape orientation
