import React, { useLayoutEffect, useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'react-native'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageURL, setImageURL] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Register With Signal",
        })
    }, [navigation])

    const register = () => { 
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageURL || 'https://www.pngarts.com/files/3/Avatar-PNG-Free-Download.png'
                })
            })
            .catch((error) => alert(error.message));
     }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 30 }}>
                Create a Signal Account
                </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    value={name}
                    onChangeText={(text) => { setName(text) }}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    type="password"
                    secureTextEntry
                    onChangeText={(text) => { setPassword(text) }}
                />
                <Input
                    placeholder="Profile Picture URL"
                    value={imageURL}
                    type="text"
                    onChangeText={(text) => { setImageURL(text) }}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                disabled={!email}
            containerStyle={styles.button}
            raised
            onPress={register}
            title="Register"
            />

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
