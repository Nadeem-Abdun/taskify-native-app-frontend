import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput, Avatar, Dialog, Button } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, clearError, clearMessage, updateProfile, loadUser, verifyUser, updatePassword } from '../redux/action';
import mime from 'mime';
import Toast from 'react-native-toast-message';

const Main = ({ navigation, ...rest }) => {
    const { route } = rest;
    const dispatch = useDispatch();
    const { user: authUser, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth);
    const { loading: taskLoading, error: taskError, message: taskMessage } = useSelector(state => state.task);
    const { loading: profileLoading, error: profileError, message: profileMessage } = useSelector(state => state.profile);
    const { loading: passwordLoading, error: passwordError, message: passwordMessage } = useSelector(state => state.password);

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
        avatar: authUser.avatar.url,
        name: authUser.name,
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

    const handleProfileUpdate = async () => {
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

    const handleOtpSubmit = async () => {
        await dispatch(verifyUser(profile.otp));
    };

    const handleChangePassClick = async () => {
        await dispatch(updatePassword(profile.oldPassword, profile.newPassword));
        await handlePassDialogOpen();
    };

    useEffect(() => {
        if (route && route.params && route.params.image) {
            setProfile({
                ...profile,
                avatar: route.params.image
            })
        }
    }, [route]);

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
                <Text style={styles.headingText}>Taskify - Profile</Text>
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
                <Button mode='contained' labelStyle={{ fontSize: 18, fontWeight: '600' }} style={styles.updateBtn} textColor='#fff' onPress={() => handleProfileUpdate()} loading={profileLoading}>
                    UPDATE
                </Button>
                {authUser && authUser.verified ?
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
                        label='Old Password'
                        placeholder='Old Password'
                        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                    />
                    <TextInput
                        style={styles.dialogInput}
                        onChangeText={(text) => handleTextFieldChange('newPassword', text)}
                        value={profile.newPassword}
                        secureTextEntry={showPassword}
                        mode='outlined'
                        label='New Password'
                        placeholder='New Password'
                        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode='contained' style={styles.dialogBtn} textColor='#fff' onPress={() => handlePassDialogOpen()}>Cancel</Button>
                    <Button mode='contained' style={styles.dialogBtn} textColor='#fff' onPress={() => handleChangePassClick()} disabled={!profile.oldPassword || !profile.newPassword || profileLoading}>Submit</Button>
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
                        label='OTP'
                        placeholder='OTP'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode='contained' style={styles.dialogBtn} textColor='#fff' onPress={() => handleVerifyDialogOpen()}>Cancel</Button>
                    <Button mode='contained' style={styles.dialogBtn} textColor='#fff' onPress={() => handleOtpSubmit()} disabled={!profile.otp || !profile.otp || authLoading}>Submit</Button>
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
    headingText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: '#474747',
        marginVertical: 15,
        width: '100%',
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
    updateBtn: {
        backgroundColor: '#900',
        paddingVertical: 5,
        marginVertical: 12,
        borderRadius: 5,
        width: '75%',
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
        marginVertical: 10,
        fontSize: 16,
    },
    dialogBtn: {
        borderRadius: 10,
        paddingHorizontal: 5,
    }
});