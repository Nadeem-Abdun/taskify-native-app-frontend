import React, { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const ToastMessage = ({ isVisible, message, onClose }) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const onDismissSnackBar = () => {
        setSnackbarOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const openSnackBar = () => setSnackbarOpen(true);

    useEffect(() => {
        if (isVisible) {
            openSnackBar();
        } else {
            onDismissSnackBar();
        }
    }, [isVisible]);

    return (
        <Snackbar
            visible={snackbarOpen}
            onDismiss={onDismissSnackBar}
            action={{
                label: 'Close',
                onPress: onDismissSnackBar,
            }}
        >
            {message}
        </Snackbar>
    );
};

ToastMessage.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.node.isRequired,
    onClose: PropTypes.func,
};

export default ToastMessage;