// External libs
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import RNDocumentScanner from "react-native-document-scanner";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCapturing: false,
      isCropping: false,
      isValidatingImageCropping: false,
      image: null,
    };
  }

  /**
   * When crop button is clicked
   */
  _handlePressCrop = () => {
    this.setState({ isValidatingImageCropping: true }, () => {
      setTimeout(this._startImageCropping, 0);
    });
  };

  /**
   * Start image cropping
   */
  _startImageCropping = () => {
    this.scanner.cropImage().then(({ image }) => {
      this.setState({ image, isValidatingImageCropping: false });
    });
  };

  render() {
    const {
      isCapturing,
      isCropping,
      isValidatingImageCropping,
      image,
    } = this.state;

    if (image === null) {
      return (
        <View style={styles.container}>
          {/* Document scanner */}
          <RNDocumentScanner
            ref={(ref) => (this.scanner = ref)}
            onStartCapture={() => this.setState({ isCapturing: true })}
            onEndCapture={() =>
              this.setState({ isCapturing: false, isCropping: true })
            }
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
          />

          {/* Button to scan document */}
          <Button
            disabled={!isCropping}
            onPress={this._handlePressCrop}
            title="Validate"
            color="#0082CA"
          />

          {/* Loading during capture */}
          {(isCapturing || isValidatingImageCropping) && (
            <ActivityIndicator style={styles.loading} animating />
          )}
        </View>
      );
    } else {
      return (
        <Image
          style={styles.container}
          source={{ uri: image }}
          resizeMode="contain"
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});
