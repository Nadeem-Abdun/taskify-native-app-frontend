import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';

const Main = ({ navigation, ...rest }) => {

    const { route } = rest;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        const uploadedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            allowsMultipleSelection: false,
        });
        const imageUri = uploadedImage.assets && uploadedImage.assets.length > 0 ? uploadedImage.assets[0].uri : null;
        if (route.params.profile) {
            return navigation.navigate('Profile', { image: imageUri });
        }
        else if (route.params.register) {
            return navigation.navigate('SignUp', { image: imageUri });
        }
        else {
            return;
        }
    }

    const clickPicture = async () => {
        const photo = await camera.takePictureAsync();
        if (route.params.profile) {
            return navigation.navigate('Profile', { image: photo.uri });
        }
        else if (route.params.register) {
            return navigation.navigate('SignUp', { image: photo.uri });
        }
        else {
            return;
        }
    }

    if (permission === null) {
        return <View />;
    }

    if (permission === false) {
        return (
            <View style={styles.requestContainer}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(e) => setCamera(e)} />
            <View style={styles.buttonContainer}>
                <Icon name='image' size={40} color='#fff' onPress={() => openImagePicker()} />
                <Icon name='camera' size={40} color='#fff' onPress={() => clickPicture()} />
                <Icon name='flip-camera-android' size={40} color='#fff' onPress={() => toggleCameraType()} />
            </View>
        </View >
    )
}

const CameraScreen = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    requestContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '75%'
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});