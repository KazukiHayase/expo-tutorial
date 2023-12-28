import { View, Image, ImageSourcePropType } from 'react-native';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}

export const EmojiSticker: React.FC<Props> = ({ imageSize, stickerSource }) => {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}

