import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                googleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();
                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                        await auth().signInWithCredential(googleCredential).then((res) => {
                            firestore().collection('users').where('uid', '==', `${res.user._user.uid}`).get().then((querySnapshot) => {
                                if (querySnapshot.size === 0) {
                                    firestore().collection('users').add({
                                        uid: res.user.uid,
                                        displayName: res.user.displayName,
                                        email: res.user.email,
                                        photoURL: res.user.photoURL,
                                        createdAt: new Date(),
                                    });
                                }
                            }
                            );
                        }).catch(error => {
                            console.log(error);
                        })

                    } catch (e) {
                        console.log(e);
                        ToastAndroid.showWithGravity(
                            'User credential is not correct',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                        );
                    }
                },
                fblogin: async () => {

                    try {
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                            throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential).then((res) => {
                            firestore().collection('users').where('uid', '==', `${res.user._user.uid}`).get().then((querySnapshot) => {
                                if (querySnapshot.size === 0) {
                                    firestore().collection('users').add({
                                        uid: res.user.uid,
                                        displayName: res.user.displayName,
                                        email: res.user.email,
                                        photoURL: res.user.photoURL,
                                        createdAt: new Date(),
                                    });
                                }
                            }
                            );
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                    catch (e) {
                        console.log(e);
                        ToastAndroid.showWithGravity(
                            'User credential is not correct',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                        );
                    }

                },
                logout: async () => {
                    try {
                        await auth().signOut();
                        ToastAndroid.showWithGravity(
                            'Logged out successfully',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                        );
                    } catch (e) {
                        console.log(e);
                        ToastAndroid.showWithGravity(
                            'Logout failed',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                        );
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};

//Xo8WBi6jzSxKDVR4drqm84yr9iU=
//orVFUFitijQ3+A9olxWoofgvGAQ=