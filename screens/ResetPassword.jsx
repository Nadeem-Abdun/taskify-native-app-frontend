import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/action';
import Toast from 'react-native-toast-message';

const Main = ({ navigation, ...rest }) => {
    const dispatch = useDispatch();
    const { user: authUser, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth);
    const { loading: taskLoading, error: taskError, message: taskMessage } = useSelector(state => state.task);
    const { loading: profileLoading, error: profileError, message: profileMessage } = useSelector(state => state.profile);
    const { loading: passwordLoading, error: passwordError, message: passwordMessage } = useSelector(state => state.password);

    const [showPassword, setShowPassword] = useState(true);

    const [resetPass, setResetPass] = useState({
        otp: '',
        newPassword: '',
    });

    const handleTextFieldChange = (name, value) => {
        setResetPass({
            ...resetPass,
            [name]: value
        });
    };

    const handleResetPassword = async () => {
        await dispatch(resetPassword(resetPass.otp, resetPass.newPassword));
        await navigation.navigate('SignIn');
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
        <View style={styles.container}>
            <Text style={styles.headingText}>Taskify - Reset Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder='OTP'
                mode='outlined'
                keyboardType='numeric'
                value={resetPass.otp}
                onChangeText={(text) => handleTextFieldChange('otp', text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder='New Password'
                mode='outlined'
                secureTextEntry={showPassword}
                value={resetPass.newPassword}
                onChangeText={(text) => handleTextFieldChange('newPassword', text)}
                right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
            />
            <Button mode='contained' labelStyle={{ fontSize: 18, fontWeight: '600' }} style={styles.resetBtn} textColor='#fff' onPress={() => handleResetPassword()} loading={passwordLoading} disabled={!resetPass.otp || !resetPass.newPassword}>
                Reset Password
            </Button>
            <View style={styles.helperTextContainer}>
                <Text style={styles.resendHelperText}>Didn't recieve OTP?</Text>
                <Text style={styles.resendText} onPress={() => navigation.navigate('ForgotPassword')}>Resend OTP</Text>
            </View>
        </View >
    )
}

const ResetPassword = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default ResetPassword;

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
    resetBtn: {
        backgroundColor: '#900',
        paddingVertical: 5,
        marginVertical: 12,
        borderRadius: 5,
        width: '75%',
    },
    helperTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    resendText: {
        color: '#900',
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 2,
    },
    resendHelperText: {
        fontSize: 14,
        marginHorizontal: 2,
    },
});