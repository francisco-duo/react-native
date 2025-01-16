import { useState } from 'react';
import { StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    onSelect: (image: ImageSource) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    const [emoji] = useState<ImageSource[]>([
        require('@/assets/images/background-image.png'),
        require('@/assets/images/background-image.png'),
        require('@/assets/images/background-image.png'),
        require('@/assets/images/background-image.png'),
        require('@/assets/images/background-image.png'),
        require('@/assets/images/background-image.png'),
    ]);

    return (
        // Renderiza todas as imagens de emoji usando o 'Image' de compoentem.
        // Cada imagem é envolvida por um 'Pressable' que chama a função 'onSelect' quando pressionada.
        <FlatList
            // Renderiza a lista horizontalmente
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            // Renderiza cada imagem de emoji.
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}
                >
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});