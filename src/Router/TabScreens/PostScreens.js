import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Posts from "../../screens/posts/Posts";
import PostDetails from "../../screens/posts/PostDetails";



const Stack = createNativeStackNavigator();

export default PostScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen
                name="posts"
                component={Posts}
            />

            <Stack.Screen
                name="detail"
                component={PostDetails}
            />

        </Stack.Navigator>
    )
}