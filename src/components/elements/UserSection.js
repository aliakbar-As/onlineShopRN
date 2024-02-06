import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export const UserSection = ({
    image,
    fName,
    lName,
    email,
    onPress
}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.users}>
                <View style={styles.userImageView}>
                    <Image
                        resizeMode='contain'
                        source={{ uri: image }}
                        style={styles.userImageStyle} />
                </View>


                <View style={{ marginLeft: 16 }}>
                    <Text style={styles.titles}>{fName} {lName}</Text>
                    <Text style={styles.emailTitle}>{email}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    emailTitle: {
        color: '#000',
        textAlign: 'left',
        fontSize: 14,
        marginTop: 5,
    },
    titles: {
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        fontSize: 15,
    },
    userImageView: {
        padding: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImageStyle: {
        width: 85,
        height: 85,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#CDE1F4'
    },
    users: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },


});