import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import { Input } from '@rneui/themed';

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Home({ navigation }: HomeProps) {
    const [user1 , setUser1] = React.useState<User | null>(null);
    const [user2 , setUser2] = React.useState<User | null>(null);

    const [error , setError] = React.useState<string | null>(null);

    const startGame = () => {
        if(!user1?.name || !user2?.name) {
            setError('Please enter both users');
            return;
        }

        navigation.navigate('Game', {
            user1,
            user2
        });
        setError(null);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Enter the names of the two players</Text>
            <Text>User 1</Text>
            <Input
                onChangeText={(text) => setUser1({name: text})}
                placeholder='User 1' 
            />
            <Text>User 2</Text>
            <Input 
                onChangeText={(text) => setUser2({name: text})}
                placeholder='User 2'
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Button
                title="Start Game"
                style={styles.button}
                onPress={startGame}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    button : {
        backgroundColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 3,
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    errorText : {
        color: 'red',
        textAlign: 'center',
    },
    headingText : {
        color : 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    }
})