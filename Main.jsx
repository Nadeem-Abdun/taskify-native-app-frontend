import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import CameraScreen from './screens/CameraScreen';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/action';

const Main = () => {

    const Stack = createNativeStackNavigator();

    const { isAuthenticated, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadUser());
        } else {
            alert('Welcome, Login to continue.')
        }
    }, [dispatch]);

    return (
        <View style={styles.container}>
            {loading ?
                <Loader />
                :
                <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'SignIn'}>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                    <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
            <Footer />
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

