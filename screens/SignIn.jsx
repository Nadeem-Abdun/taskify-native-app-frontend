import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, clearMessage } from '../redux/action';
import Toast from 'react-native-toast-message';
// import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';

const SignIn = ({ navigation, ...rest }) => {
    const dispatch = useDispatch();
    const { user: authUser, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth);
    const { loading: taskLoading, error: taskError, message: taskMessage } = useSelector(state => state.task);
    const { loading: profileLoading, error: profileError, message: profileMessage } = useSelector(state => state.profile);
    const { loading: passwordLoading, error: passwordError, message: passwordMessage } = useSelector(state => state.password);

    const [showPassword, setShowPassword] = useState(true);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const handleLoginFieldChange = (name, value) => {
        setLogin({
            ...login,
            [name]: value
        });
    };

    const handleLoginClick = () => {
        dispatch(loginUser(login.email, login.password));
        setLogin({
            email: '',
            password: ''
        });
    };

    useEffect(() => {
        if (authError || taskError || profileError || passwordError) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `${authError || ''} ${taskError || ''} ${profileError || ''} ${passwordError || ''}`,
                visibilityTime: 4000,
                autoHide: true,
                text1Style: {
                    fontSize: 20,
                    fontWeight: '600'
                },
                text2Style: {
                    fontSize: 18,
                    fontWeight: '500'
                },
            });
            dispatch(clearError());
        }
        if (authMessage || taskMessage || profileMessage || passwordMessage) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `${authMessage || ''} ${taskMessage || ''} ${profileMessage || ''} ${passwordMessage || ''}`,
                visibilityTime: 4000,
                autoHide: true,
                text1Style: {
                    fontSize: 20,
                    fontWeight: '600'
                },
                text2Style: {
                    fontSize: 18,
                    fontWeight: '500'
                },
            });
            dispatch(clearMessage());
        }
    }, [authError, authMessage, taskError, taskMessage, profileError, profileMessage, passwordError, passwordMessage, dispatch]);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headingText}>Taskify - Login</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='email-address'
                    placeholder='Email'
                    mode='outlined'
                    value={login.email}
                    onChangeText={(text) => handleLoginFieldChange('email', text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    mode='outlined'
                    secureTextEntry={showPassword}
                    value={login.password}
                    onChangeText={(text) => handleLoginFieldChange('password', text)}
                    right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                />
                <Pressable style={styles.loginBtn} onPress={() => handleLoginClick()}>
                    <Text style={styles.loginBtnTxt}>LOGIN</Text>
                </Pressable>
                <Text style={styles.signUpHelperText}>Or</Text>
                <Pressable style={styles.signUpBtn} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpBtnTxt}>Sign Up</Text>
                </Pressable>
                <View style={styles.helperTextContainer}>
                    <Text style={styles.loginhelpertext}>Forgot Password?</Text>
                    <Text style={styles.loginText} onPress={() => navigation.navigate('ForgotPassword')}>Reset</Text>
                </View>
            </View >
        </>
    )
}

// const SignIn = ({ navigation, ...rest }) => {
//     return (
//         <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
//     )
// }

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    headingText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: '#474747',
        marginVertical: 15,
        width: '100%',
    },
    textInput: {
        borderColor: '#b5b5b5',
        paddingLeft: 5,
        borderRadius: 5,
        marginVertical: 12,
        fontSize: 14,
        width: '75%',
    },
    loginBtn: {
        backgroundColor: '#900',
        paddingVertical: 12,
        borderRadius: 5,
        width: '75%',
    },
    loginBtnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    signUpBtn: {
        paddingVertical: 12,
        borderRadius: 5,
    },
    signUpBtnTxt: {
        color: '#900',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    signUpHelperText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
    },
    helperTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    loginText: {
        color: '#900',
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 2,
    },
    loginhelpertext: {
        fontSize: 14,
        marginHorizontal: 2,
    },
});