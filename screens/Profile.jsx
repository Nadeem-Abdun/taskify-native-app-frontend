import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput, Avatar, Dialog, Button } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, clearError, clearMessage, updateProfile, loadUser } from '../redux/action';
import mime from 'mime';

const Main = ({ navigation, ...rest }) => {

    const { route } = rest;

    const dispatch = useDispatch();
    const { user, error, message, loading } = useSelector(state => state.auth);

    const [openPassDialog, setOpenPassDialog] = useState(false);
    const handlePassDialogOpen = () => {
        setOpenPassDialog(!openPassDialog)
    };

    const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
    const handleVerifyDialogOpen = () => {
        setOpenVerifyDialog(!openVerifyDialog)
    };

    const [showPassword, setShowPassword] = useState(true);

    const [profile, setProfile] = useState({
        avatar: user.avatar.url,
        name: user.name,
        oldPassword: '',
        newPassword: '',
        otp: '',
    });

    const handleTextFieldChange = (name, value) => {
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleLogoutClick = async () => {
        dispatch(logoutUser());
    };

    const updateFormSubmit = async () => {
        const updateProfileForm = await new FormData();
        await updateProfileForm.append("name", profile.name);
        await updateProfileForm.append("avatar", {
            uri: profile.avatar,
            type: mime.getType(profile.avatar),
            name: profile.avatar.split('/').pop(),
        });
        await dispatch(updateProfile(updateProfileForm));
        await dispatch(loadUser());
    };

    const handleAvatarClick = () => {
        navigation.navigate('Camera', {
            profile: true
        });
    };

    const handleOtpSubmit = () => {
        console.log(user.verified)
    }

    const handleChangePassClick = () => {

    }

    useEffect(() => {
        if (route && route.params && route.params.image) {
            setProfile({
                ...profile,
                avatar: route.params.image
            })
        }
    }, [route]);

    return (
        <>
            <View style={styles.container}>
                <Avatar.Image
                    size={140}
                    source={{ uri: profile.avatar }}
                    style={{ backgroundColor: '#900' }}
                />
                {profile.avatar === ' ' ?
                    <Text style={styles.avatarhelpertext} onPress={() => handleAvatarClick()}>Add Picture</Text>
                    :
                    <Text style={styles.avatarhelpertext} onPress={() => handleAvatarClick()}>Change Picture</Text>
                }
                <TextInput
                    style={styles.textInput}
                    placeholder='Name'
                    mode='outlined'
                    value={profile.name}
                    onChangeText={(text) => handleTextFieldChange('name', text)}
                />
                <Pressable style={styles.registerBtn} onPress={() => updateFormSubmit()}>
                    <Text style={styles.registerBtnTxt}>UPDATE</Text>
                </Pressable>
                {user && user.verified ?
                    <Pressable style={styles.transparentBtn} onPress={() => handlePassDialogOpen()}>
                        <Text style={styles.changePassBtnTxt}>Change Password</Text>
                    </Pressable>
                    :
                    <Pressable style={styles.transparentBtn} onPress={() => handleVerifyDialogOpen()}>
                        <Text style={styles.changePassBtnTxt}>Verify Account</Text>
                    </Pressable>
                }
                <Pressable style={styles.transparentBtn} onPress={() => handleLogoutClick()}>
                    <Text style={styles.logoutBtnTxt}>LOGOUT</Text>
                </Pressable>
            </View >
            <Dialog visible={openPassDialog} onDismiss={handlePassDialogOpen} style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                <Dialog.Title style={{ textAlign: 'center', fontWeight: '500' }}>
                    Change Password
                </Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={styles.dialogInput}
                        onChangeText={(text) => handleTextFieldChange('oldPassword', text)}
                        value={profile.oldPassword}
                        secureTextEntry={showPassword}
                        mode='outlined'
                        placeholder='Old Password'
                        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                    />
                    <TextInput
                        style={styles.dialogInput}
                        onChangeText={(text) => handleTextFieldChange('newPassword', text)}
                        value={profile.newPassword}
                        secureTextEntry={showPassword}
                        mode='outlined'
                        placeholder='New Password'
                        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode='contained-tonal' onPress={() => handlePassDialogOpen()}>Cancel</Button>
                    <Button mode='contained-tonal' onPress={() => handleChangePassClick()} disabled={!profile.oldPassword || !profile.newPassword || loading}>Submit</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog visible={openVerifyDialog} onDismiss={handleVerifyDialogOpen} style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                <Dialog.Title style={{ textAlign: 'center', fontWeight: '500' }}>
                    Verify Account
                </Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={styles.dialogInput}
                        onChangeText={(text) => handleTextFieldChange('otp', text)}
                        value={profile.otp}
                        keyboardType='number-pad'
                        mode='outlined'
                        placeholder='OTP'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode='contained-tonal' onPress={() => handleVerifyDialogOpen()}>Cancel</Button>
                    <Button mode='contained-tonal' onPress={() => handleOtpSubmit()} disabled={!profile.otp || !profile.otp || loading}>Submit</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

const Profile = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default Profile;

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
        marginTop: 6,
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
    transparentBtn: {
        paddingVertical: 12,
        borderRadius: 5,
    },
    changePassBtnTxt: {
        color: '#4f65f1',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    logoutBtnTxt: {
        color: '#900',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    dialogInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#b5b5b5',
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 16,
    }
});