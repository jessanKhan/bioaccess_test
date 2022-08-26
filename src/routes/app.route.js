import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/home';
import Chatbox from '../screens/Chatbox/chatbox';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../routes/auth.provider';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();

function AppRoute() {
    const { logout } = React.useContext(AuthContext);
    const reciver = useSelector(state => state.userlist.reciever);

    return (

        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerShown: true,
                    headerTitle: 'Home',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => logout()} >
                            <Image source={{ uri: 'https://img.icons8.com/ios/50/000000/emergency-exit.png' }} style={styles.icon} />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />


            <Stack.Screen name="Chatbox" component={Chatbox} options={{
                headerShown: true,
                headerTitle: `${reciver}`,
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        marginRight: 30,
    },
})

export default AppRoute;
