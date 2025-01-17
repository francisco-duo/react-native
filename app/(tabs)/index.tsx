import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';

import { useState } from 'react';

import { type ImageSource } from 'expo-image';

import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
    // Estado para armazenar a imagem selecionada pelo usuário.
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    // Estado para controlar a visibilidade dos botões de opções do aplicativo.
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    // Estado para controlar a visibilidade do modal.
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // Estado para armazenar a imagem selecionada.
    const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

    // Função para selecionar uma imagem da galeria.
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert('You did not select any image.');
        }
    };

    // Função para resetar o estado da aplicação.
    const onReset = () => {
        setShowAppOptions(false);
    };

    // Função para abrir o modal de seleção de emoji.
    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    // Função para fechar o modal de seleção de emoji.
    const onModalClose = () => {
        setIsModalVisible(false);
    };

    // Função para salvar a imagem editada.
    const onSaveImageAsync = async () => {

    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon='refresh' label='Reset' onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
                    <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
                </View>
            )}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
            </EmojiPicker>
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
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
