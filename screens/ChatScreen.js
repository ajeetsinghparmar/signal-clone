import React, {useLayoutEffect, useState} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import {Avatar} from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import {ScrollView, TextInput} from 'react-native-gesture-handler'
import { db, auth } from '../firebase'
import * as firebase from 'firebase'

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                }}
                >
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL  ||
                    'https://www.pngarts.com/files/3/Avatar-PNG-Free-Download.png'
                    }}/>
                    <Text style={{ color: 'white', marginLeft: 30, fontWeight: '600' }}>{route.params.chatName}</Text>
                    </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                    style={{ marginLeft: 10 }} 
                    onPress={navigation.goBack}
                >
                    <AntDesign 
                    name="arrowleft" 
                    size={24} 
                    color="white" 
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )

        })
    },[navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
        ));
        return unsubscribe;
    },[route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <View
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
            <>
                <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                    {messages.map(({id, data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Avatar 
                                    position="absolute"
                                    bottom={-15}
                                    right={-5}
                                    //Web
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        right: -5,
                                    }}
                                    rounded
                                    size={30}
                                    source={{
                                        uri: data.photoURL,
                                    }}
                                />
                                <Text style={styles.receiverText}>{ data.message }</Text>
                            </View>
                        ) : (
                            <View key={id} style={styles.sender}>
                                <Avatar 
                                    position="absolute"
                                    bottom={-15}
                                    left={-5}
                                    //Web
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        left: -5,
                                    }}
                                    rounded
                                    size={30}
                                    source={{
                                        uri: data.photoURL,
                                    }}
                                />
                                <Text style={styles.senderText}>{ data.message }</Text>
                                <Text style={styles.senderName}>{ data.displayName }</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                        placeholder="Signal Message"
                        style={styles.textInput}
                        value={input}
                        onSubmitEditing={sendMessage}
                        onChangeText={(text) => setInput(text)}
                    />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#286BE6" />
                    </TouchableOpacity>
                </View>
            </>
            </View>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#286BE6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
        
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
})
