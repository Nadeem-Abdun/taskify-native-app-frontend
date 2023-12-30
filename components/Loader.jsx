import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color="#900" size="large" />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

