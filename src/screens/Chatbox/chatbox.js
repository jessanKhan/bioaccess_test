// import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { AuthContext } from '../../routes/auth.provider'

// const Chatbox = (props) => {
//     console.log("page props", props.route.params)
//     const friendid = props.route.params;
//     const { user } = useContext(AuthContext)
//     return (
//         <View>
//             <Text>Chatbox</Text>
//         </View>
//     )
// }

// export default Chatbox

// const styles = StyleSheet.create({})

import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,
    Button
} from 'react-native';
import { AuthContext } from '../../routes/auth.provider'
import firestore from '@react-native-firebase/firestore';



const Chatbox = (props) => {

    const [message, setMessage] = React.useState('')
    const { user } = useContext(AuthContext)
    const friendid = props.route.params;
    const [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        //get chat history from firestore
        const subscriber = firestore()
            .collection('messages').orderBy('createdAt', 'asc')
            .onSnapshot(documentSnapshot => {
                // update documentSnapshot to include only messages between the two users and sort by timestamp in descending order
                setHistory(documentSnapshot.docs.filter(doc => doc.data().sender === user.uid && doc.data().receiver === friendid || doc.data().sender === friendid && doc.data().receiver === user.uid).sort((a, b) => (a.data().timestamp > b.data().timestamp) ? -1 : 1))
            });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [friendid]);

    //send message to firestore
    const sendText = () => {
        if (message.length > 0) {
            firestore()
                .collection('messages').add({
                    sender: user.uid,
                    receiver: props.route.params,
                    message: message,
                    createdAt: new firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    setMessage('')
                })
        }
    }


    // date formatting
    const renderDate = (date) => {
        return (
            <Text style={styles.time}>
                {date === null ? '' : date?.toDate().toLocaleTimeString()}
            </Text>
        );
    }





    return (
        <View style={styles.container}>
            <ScrollView >
                {history.map((histor) =>
                    <View style={[styles.item, histor._data.sender === user.uid ? styles.itemOut : styles.itemIn]}>
                        {histor._data.sender !== user.uid && renderDate(histor._data.createdAt)}
                        <View style={[styles.balloon]}>
                            <Text>{histor._data.message || "kkkk"}</Text>
                        </View>
                        {histor._data.sender === user.uid && renderDate(histor._data.createdAt)}
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Write a message..."
                        underlineColorAndroid='transparent'
                        value={message}
                        onChangeText={(text) => setMessage(text)} />
                </View>

                <TouchableOpacity style={styles.btnSend} onPress={() => sendText()}>
                    <Image source={{ uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} />
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
    },
    btnSend: {
        backgroundColor: "#00BFFF",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start'
    },
    itemOut: {
        alignSelf: 'flex-end'
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize: 12,
        color: "#808080",
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#eeeeee",
        borderRadius: 300,
        padding: 5,
    },
});

export default Chatbox
