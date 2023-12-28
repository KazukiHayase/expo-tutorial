import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

type ImageViewerProps = {
  source: ImageSourcePropType;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ source }) => {
  return (
    <Image source={source} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})
