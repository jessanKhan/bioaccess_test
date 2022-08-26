import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../screens/Signin/signin'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

function AuthRoute() {
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: '903566165907-8u90ag2vib1ugj2q8vmarofi7em7pfbb.apps.googleusercontent.com',
        });
    }, [])
    return (

        <Stack.Navigator>
            <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>

    );
}

export default AuthRoute;
