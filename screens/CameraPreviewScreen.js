import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library'

const CameraPreview = ({navigation, route}) => {
    console.log(route.params.photo)
    return (
        <View
        style={styles.container}
        >
        <ImageBackground
            source={{uri: route.params.photo?.uri}}
            style={{flex:1}}
        >
            <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress = { async () => {
            const asset = await MediaLibrary.createAssetAsync(route.params.photo?.uri)
                alert(`Image is saved in ${asset.uri}`);
                navigation.goBack();
            }}        
        >
            <AntDesign name="pluscircle" size={40} color="white" />
        </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    )
}

export default CameraPreview

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 0,
        alignSelf: 'flex-end',
        margin: 10,
        bottom: 5,
        right: 5
    },
})
