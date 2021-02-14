import {MaterialIcons} from '@expo/vector-icons';
import {Camera} from 'expo-camera';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'

const CameraScreen = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            const mediaStatus = await MediaLibrary.requestPermissionsAsync();
            console.log(mediaStatus)
            setHasPermission(status === 'granted' && mediaStatus.status === 'granted');
        })();
    }, []);
    
    if (hasPermission === null) {
        return <View />
    }

    if (hasPermission === false) {
        return <Text> No Access to Camera </Text>
    }

    return (
        <View style={styles.container}>
            <Camera 
                style={styles.camera} 
                type={type}
                flashMode= "auto"
                ref={(ref) => {
                    camera = ref
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            )
                        }}>
                            <MaterialIcons name="flip-camera-android" size={40} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                if (!camera) return
                                const photo = await camera.takePictureAsync()
                                navigation.navigate('CameraPreview', {
                                    photo 

                                })
                            }}
                        >
                            <MaterialIcons name="camera" size={40} color="black" />
                        </TouchableOpacity>

                </View>
            </Camera>
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between'
    },
    button: {
        flex: 0.3,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
})
