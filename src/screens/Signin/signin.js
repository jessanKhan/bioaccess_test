
import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { AuthContext } from '../../routes/auth.provider';

const Signin = () => {
    const { googleLogin, fblogin } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]} onPress={() => fblogin()} >
                <View style={styles.socialButtonContent}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-new.png' }} />
                    <Text style={styles.loginText}>Continue with facebook</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]} onPress={() => googleLogin()}>
                <View style={styles.socialButtonContent}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} />
                    <Text style={styles.loginText}>Sign in with google</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0E0E6',
    },

    icon: {
        width: 30,
        height: 30,
    },

    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#3498db',
    },
    fabookButton: {
        backgroundColor: "#d2d2d2",
    },
    googleButton: {
        backgroundColor: "#d2d2d2",
    },
    loginText: {
        color: '#000000',
    },

    socialButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        color: "#FFFFFF",
        marginRight: 5
    }
});



export default Signin

