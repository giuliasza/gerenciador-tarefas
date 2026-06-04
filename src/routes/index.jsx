import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Tarefas from '../screens/TaskList'; 
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ca7df9',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          height: 70,
          paddingBottom: 5,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? 'grid' : 'grid-outline'} size={size + 4} color={color} />) }}
      />

      {/* A nossa tela antiga agora é a aba de Tarefas! */}
      <Tab.Screen
        name="Tarefas"
        component={Tarefas}
        options={{ tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? 'list' : 'list-outline'} size={size + 4} color={color} />) }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ tabBarIcon: ({ color, size, focused }) => (<Ionicons name={focused ? 'person' : 'person-outline'} size={size + 4} color={color} />) }}
      />
    </Tab.Navigator>
  );
}