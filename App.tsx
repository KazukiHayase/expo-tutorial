import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ImageViewer } from './ImageViewer';
import { Button } from './Button';
import { ImagePickerAsset, launchImageLibraryAsync } from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset>(PlaceholderImage);

  const handlePickImageAsync = async () => {
    const { assets, canceled } = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (canceled) {
      alert('You did not select any image.');
      return;
    }

    const image = assets[0]
    if (!image) {
      alert('You did not select any image.');
      return;
    }

    setSelectedImage(image);
    setShowAppOptions(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer source={selectedImage} />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button theme='primary' label="Choose a photo" onPress={handlePickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
