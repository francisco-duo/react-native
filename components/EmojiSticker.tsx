import { View } from "react-native";
import { Image, type ImageSource } from "expo-image";

// Animated é importado para permitir a animação da imagem de emoji.
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { EventEmitter } from "expo";

// A props 'imageSize' é usada para definir o tamanho da imagem de emoji.
// A props 'stickerSource' é usada para definir a fonte da imagem de emoji.
type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    // Ajuda a mutar dados e executa animações com base no valor atual.
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    // A constante doubleTap é usada para detectar um toque duplo na imagem de emoji.
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value === imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });
    const imageStyle = useAnimatedStyle(() => {
        return {
            widh: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });
    const drag = Gesture.Pan().onChange(event => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                }
            ],
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    {/* Animated.Image para animar a imagem */}
                    <Animated.Image
                        source={stickerSource}
                        resizeMode={"contain"}
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}