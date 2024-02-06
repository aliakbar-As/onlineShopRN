import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Header } from '../../components';
import axios from 'axios';
import { UserSection } from '../../components/elements';

const baseUrl = 'https://dummyjson.com';


const Users = ({ navigation }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserList();
    }, []);


    const getUserList = () => {
        axios.get(`${baseUrl}/users`)
            .then(res => {
                setUsers(res.data.users);
            }).catch(err => console.error(err));
    };

    return (
        <View style={styles.container}>
            <Header
                primary
                title={'Users'} />

            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return (
                        <UserSection
                            image={item.image}
                            fName={item.firstName}
                            lName={item.lastName}
                            email={item.email}
                            onPress={() => navigation.navigate('detail', { user: item })}
                        />
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
export default Users;