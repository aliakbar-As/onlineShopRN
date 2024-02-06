import React from 'react';
import { TouchableOpacity, Text } from "react-native";


export const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    title: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 5
    }
}