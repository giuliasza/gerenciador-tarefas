import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import { TaskStack } from './StackNavigator'; 

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: '#ca7df9', tabBarInactiveTintColor: '#000', tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 10, height: 70, paddingBottom: 100, paddingTop: 10 } }}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? 'grid' : 'grid-outline'} size={size + 4} color={color} />) }} />
            <Tab.Screen name="Tarefas" component={TaskStack} options={{ tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? 'list' : 'list-outline'} size={size + 4} color={color} />) }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? 'person' : 'person-outline'} size={size + 4} color={color} />) }} />
        </Tab.Navigator>
    );
}