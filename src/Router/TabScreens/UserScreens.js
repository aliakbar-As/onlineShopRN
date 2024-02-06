import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Users from "../../screens/users/Users";
import UserDetails from "../../screens/users/UserDetails";



const Stack = createNativeStackNavigator();

export default UserScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen
                name="users"
                component={Users}
            />

            <Stack.Screen
                name="detail"
                component={UserDetails}
            />

        </Stack.Navigator>
    )
}