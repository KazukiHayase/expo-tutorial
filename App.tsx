import { StatusBar } from 'expo-status-bar';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { ImageViewer } from './components/ImageViewer';
import { Button } from './components/Button';
import { ImagePickerAsset, launchImageLibraryAsync } from 'expo-image-picker';
import { useState } from 'react';
import { IconButton } from './components/IconButton';
import CircleButton from './components/CircleButton';
import { EmojiPicker } from './components/EmojiPicker';
import { EmojiList } from './components/EmojiList';
import { EmojiSticker } from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset>(PlaceholderImage);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(null);

  const handleReset = () => {
    setShowAppOptions(false);
  }

  const handleAddSticker = () => {
    setModalVisible(true);
  }

  const handleSaveImageAsync = () => {
    // TODO
  }

  const handleModalClose = () => {
    setModalVisible(false);
  }

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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer source={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={handleReset} />
            <CircleButton onPress={handleAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={handleSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme='primary' label="Choose a photo" onPress={handlePickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker visible={modalVisible} onClose={handleModalClose}>
        <EmojiList onSelect={setPickedEmoji} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
