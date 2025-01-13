import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type GameProps = NativeStackScreenProps<RootStackParamList, 'Game'>

export default function Game({ route }: GameProps) {
    const { user1, user2 } = route.params;
    return (
        <View>
            <Text>{user1.name}</Text>
            <Text>{user2.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})