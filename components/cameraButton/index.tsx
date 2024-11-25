import { Text, View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ImageSelectionProps = {
    handleUpload: (image: string) => void;
}

export default function CameraButton(props: ImageSelectionProps) {

    const takeImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.getCameraPermissionsAsync().then((res) => {
            if (res.granted) {
                ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                }).then((result) => {
                    if (!result.canceled) {
                        props.handleUpload(result.assets[0].uri);
                    }
                });
            } else {
                Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
            }
        })
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
            gap: 3,
            alignSelf: 'center',
        }
    })

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={takeImage}>
                <View style={styles.camera_container}>
                    <MaterialIcons name="camera-alt" size={24} color="black" />
                    <Text style={styles.text}>Camera</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
}