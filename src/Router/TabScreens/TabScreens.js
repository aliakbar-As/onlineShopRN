import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import MyTabBar from './MyTabBar';

import HomeScreens from './HomeScreens';
import UserScreens from './UserScreens';
import PostScreens from './PostScreens';

const Tab = createBottomTabNavigator();

export default TabScreens = () => {
    return (
        <Tab.Navigator
            initialRouteName='homeScreens'
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <MyTabBar {...props} />}
        >

            <Tab.Screen
                name='userScreens'
                component={UserScreens}
                options={{
                    tabBarLabel: 'Users',
                    iconName: 'user',
                    headerShown: false
                }}
            />

            <Tab.Screen
                name='postScreens'
                component={PostScreens}
                options={{
                    tabBarLabel: 'Posts',
                    iconName: 'profile',
                    headerShown: false
                }}
            />

            <Tab.Screen
                name='cartScreens'
                component={HomeScreens}
                options={{
                    tabBarLabel: 'Cart',
                    iconName: 'shoppingcart',
                    headerShown: false
                }}
            />

            <Tab.Screen
                name='homeScreens'
                component={HomeScreens}
                options={{
                    tabBarLabel: 'Home',
                    iconName: 'home',
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}