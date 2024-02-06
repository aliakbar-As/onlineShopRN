import React from 'react';
import { TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'

export const Search = ({
    value,
    onChangeText,
    placeholder
}) => {
    return (
        <View style={styles.container}>
            <Icon
                name={'search1'}
                color={'#ccc'}
                size={20}
            />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.input}
            />
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
    },
    input: {
        paddingHorizontal: 10,
        width: '100%',
        color: '#2d2d2d'

    }
}
