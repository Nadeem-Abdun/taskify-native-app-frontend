import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput, Avatar } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import mime from 'mime';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action';

const Main = ({ navigation, ...rest }) => {

    const { route } = rest;
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(true);

    const [signUp, setSignUp] = useState({
        avatar: ' ',
        name: '',
        email: '',
        password: '',
    });

    const handleSignUpFieldChange = (name, value) => {
        setSignUp({
            ...signUp,
            [name]: value
        });
    };

    const handleAvatar = () => {
        navigation.navigate('Camera', {
            register: true
        })
    };

    const handleRegisterClick = async () => {
        const registerFormData = await new FormData();
        await registerFormData.append("name", signUp.name);
        await registerFormData.append("email", signUp.email);
        await registerFormData.append("password", signUp.password);
        await registerFormData.append("avatar", {
            uri: signUp.avatar,
            type: mime.getType(signUp.avatar),
            name: signUp.avatar.split("/").pop(),
        });
        await dispatch(registerUser(registerFormData));
    };

    useEffect(() => {
        if (route && route.params && route.params.image) {
            setSignUp({
                ...signUp,
                avatar: route.params.image
            })
        }
    }, [route]);

    return (
        <>
            <View style={styles.container}>
                <Avatar.Image
                    size={140}
                    source={{ uri: signUp.avatar }}
                    style={{ backgroundColor: '#900' }}
                />
                {signUp.avatar === ' ' ?
                    <Text style={styles.avatarhelpertext} onPress={() => handleAvatar()}>Add Picture</Text>
                    :
                    <Text style={styles.avatarhelpertext} onPress={() => handleAvatar()}>Change Picture</Text>
                }
                <TextInput
                    style={styles.textInput}
                    placeholder='Name'
                    mode='outlined'
                    value={signUp.name}
                    onChangeText={(text) => handleSignUpFieldChange('name', text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    keyboardType='email-address'
                    mode='outlined'
                    value={signUp.email}
                    onChangeText={(text) => handleSignUpFieldChange('email', text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    mode='outlined'
                    secureTextEntry={showPassword}
                    value={signUp.password}
                    onChangeText={(text) => handleSignUpFieldChange('password', text)}
                    right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                />
                <Pressable style={styles.registerBtn} onPress={() => handleRegisterClick()}>
                    <Text style={styles.registerBtnTxt}>REGISTER</Text>
                </Pressable>
                <View style={styles.helperTextContainer}>
                    <Text style={styles.loginhelpertext}>Already have an account?</Text>
                    <Text style={styles.loginText} onPress={() => navigation.navigate('SignIn')}>Login</Text>
                </View>
            </View >
        </>
    )
}

const SignUp = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    avatarhelpertext: {
        fontSize: 14,
        marginBottom: 12,
    },
    textInput: {
        borderColor: '#b5b5b5',
        paddingLeft: 5,
        borderRadius: 5,
        marginVertical: 12,
        fontSize: 14,
        width: '75%',
    },
    registerBtn: {
        backgroundColor: '#900',
        paddingVertical: 12,
        marginVertical: 12,
        borderRadius: 5,
        width: '75%',
    },
    registerBtnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
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