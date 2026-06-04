import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ajuste o caminho das importações dependendo de onde as telas ficaram salvas!
import TaskList from '../screens/TaskList';
import Task from '../screens/Task';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';

const Stack = createNativeStackNavigator();

export function TaskStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TaskList" component={TaskList} options={{ headerShown: false }} />
            <Stack.Screen name="Task" component={Task} options={{ title: 'Detalhes', headerTintColor: '#ca7df9', headerBackTitleVisible: false }} />
        </Stack.Navigator>
    );
}

export function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
    );
}