import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import { AuthStack } from './StackNavigator';
import { useTarefaStore } from '../store/useTarefaStore';

export default function RootNavigator() {
    const { usuarioLogado } = useTarefaStore();

    return usuarioLogado ? <BottomTabNavigator /> : <AuthStack />;
}