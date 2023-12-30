import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';

const SafeAreaViewAndroid = ({ Component, ...rest }) => {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <Component {...rest} />
        </SafeAreaView>
    );
};

export default SafeAreaViewAndroid;
