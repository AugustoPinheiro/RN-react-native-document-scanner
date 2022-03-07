# react-native-document-scanner

## Preview

### iOS

![iOS Preview](./ios.gif)


### Android
 
 ![Android Preview](./android.gif)

## Both Platform

Use version >=1.4.1 if you are using react-native 0.48+

`$ yarn add https://github.com/Michaelvilleneuve/react-native-document-scanner`

`$ react-native link react-native-document-scanner`

Edit the `info.plist` file in XCode and add the following permission : `NSCameraUsageDescription`

Remember, this library uses your device camera, you can't run it on a simulator.

### Android Only

If you do not have it already in your project, you must link openCV in your `settings.gradle` file

```java
include ':openCVLibrary310'
project(':openCVLibrary310').projectDir = new File(rootProject.projectDir,'../node_modules/react-native-document-scanner/android/openCVLibrary310')
```

#### In android/app/src/main/AndroidManifest.xml

Change manifest header to avoid "Manifest merger error". After you add `xmlns:tools="http://schemas.android.com/tools"` should look like this:

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.<yourAppName>" xmlns:tools="http://schemas.android.com/tools">
```

Add `tools:replace="android:allowBackup"` in <application tag. It should look like this:

```
<application tools:replace="android:allowBackup" android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:allowBackup="false" android:theme="@style/AppTheme">
```

Add Camera permissions request:

```
<uses-permission android:name="android.permission.CAMERA" />
```

## Usage

```javascript
import React, { Component } from "react";
import { View, Image } from "react-native";

import DocumentScanner from "react-native-document-scanner";

class YourComponent extends Component {
  render() {
    return (
      <View>
        <DocumentScanner
          useBase64
          saveInAppDocument={false}
          onPictureTaken={data =>
            this.setState({
              image: data.croppedImage,
              initialImage: data.initialImage,
              rectangleCoordinates: data.rectangleCoordinates
            })
          }
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          brightness={0.3}
          saturation={1}
          contrast={1.1}
          quality={0.5}
          onRectangleDetect={({ stableCounter, lastDetectionType }) =>
            this.setState({ stableCounter, lastDetectionType })
          }
          detectionCountBeforeCapture={5}
          detectionRefreshRateInMS={50}
          onPermissionsDenied={() => console.log("Permissions Denied")}
        />
        <Image
          source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
          resizeMode="contain"
        />
      </View>
    );
  }
}
```

## Properties

| Prop                        | Platform | Default |   Type    | Description                                                       |
| :-------------------------- | :------: | :-----: | :-------: | :---------------------------------------------------------------- |
| overlayColor                |   Both   | `none`  | `string`  | Color of the detected rectangle : rgba recommended                |
| detectionCountBeforeCapture |   Both   |   `5`   | `integer` | Number of correct rectangle to detect before capture              |
| detectionRefreshRateInMS    |   iOS    |  `50`   | `integer` | Time between two rectangle detection attempt                      |
| enableTorch                 |   Both   | `false` |  `bool`   | Allows to active or deactivate flash during document detection    |
| useFrontCam                 |   iOS    | `false` |  `bool`   | Allows you to switch between front and back camera                |
| brightness                  |   iOS    |   `0`   |  `float`  | Increase or decrease camera brightness. Normal as default.        |
| saturation                  |   iOS    |   `1`   |  `float`  | Increase or decrease camera saturation. Set `0` for black & white |
| contrast                    |   iOS    |   `1`   |  `float`  | Increase or decrease camera contrast. Normal as default           |
| quality                     |   iOS    |  `0.8`  |  `float`  | Image compression. Reduces both image size and quality            |
| useBase64                   |   iOS    | `false` |  `bool`   | If base64 representation should be passed instead of image uri's  |
| saveInAppDocument           |   iOS    | `false` |  `bool`   | If should save in app document in case of not using base 64       |
| captureMultiple             |   iOS    | `false` |  `bool`   | Keeps the scanner on after a successful capture                   |
| onPermissionsDenied         | android  | `null`  |  `func`   | Function to call when the Android permissions are denied          |

## Manual capture

- First get component ref

```javascript
<DocumentScanner ref={ref => (this.scanner = ref)} />
```

- Then call :

```javascript
this.scanner.capture();
```

## Each rectangle detection (iOS only)

| Props             | Params                                 | Type     | Description |
| ----------------- | -------------------------------------- | -------- | ----------- |
| onRectangleDetect | `{ stableCounter, lastDetectionType }` | `object` | See below   |

The returned object includes the following keys :

- `stableCounter`

Number of correctly formated rectangle found (this number triggers capture once it goes above `detectionCountBeforeCapture`)

- `lastDetectionType`

Enum (0, 1 or 2) corresponding to the type of rectangle found

0. Correctly formated rectangle
1. Wrong perspective, bad angle
1. Too far

## Returned image

| Prop           | Params |   Type   | Description                                                                                                                                                               |
| :------------- | :----: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onPictureTaken | `data` | `object` | Returns the captured image in an object `{ croppedImage: ('URI or BASE64 string'), initialImage: 'URI or BASE64 string', rectangleCoordinates: 'object of coordinates' }` |

## Save in app document

If you want to use saveInAppDocument options, then don't forget to add those raws in .plist :

```xml
<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
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
