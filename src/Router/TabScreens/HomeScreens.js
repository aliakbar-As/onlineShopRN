import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../../screens/home/Home";
import ProductDetails from "../../screens/home/ProductDetails";


const Stack = createNativeStackNavigator();

export default HomeScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen
                name="home"
                component={Home}
            />

            <Stack.Screen
                name="details"
                component={ProductDetails}
            />


        </Stack.Navigator>
    )
}