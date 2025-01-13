import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home';
import Game from './screens/Game';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Game: {
    user1: User;
    user2: User;
  };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // <SafeAreaView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    // </SafeAreaView>
  )
}