import React, { useEffect, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import CameraScreen from './screens/CameraScreen';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import About from './screens/About';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/action';
import Toast from 'react-native-toast-message';

const Main = forwardRef((props, ref) => {
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();
    const { user: authUser, isAuthenticated, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth);
    const { loading: taskLoading, error: taskError, message: taskMessage } = useSelector(state => state.task);
    const { loading: profileLoading, error: profileError, message: profileMessage } = useSelector(state => state.profile);
    const { loading: passwordLoading, error: passwordError, message: passwordMessage } = useSelector(state => state.password);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadUser());
        } else {
            // alert('Welcome, Login to continue.')
        }
    }, [dispatch]);

    return (
        <View style={styles.container}>
            {authLoading ?
                <Loader />
                :
                <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'SignIn'}>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                    <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
            <Footer />
            <Toast ref={ref} />
        </View>
    );
});

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});