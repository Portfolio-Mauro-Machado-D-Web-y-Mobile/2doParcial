import { Text, View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ImageSelectionProps = {
    handleUpload: (image: string) => void;
}

const ImageSelection = (props: ImageSelectionProps) => {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            props.handleUpload(result.assets[0].uri);
        } else {
            Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
        }
    }
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <View style={styles.camera_container}>
                    <MaterialIcons name="insert-photo" size={24} color="black" />
                    <Text style={styles.text}>Photo</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: 124,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    },
    camera_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'center',
    }
})

export default ImageSelection