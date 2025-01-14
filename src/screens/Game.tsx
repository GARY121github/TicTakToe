import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, Button, Card } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type GameProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

export default function Game({ route }: GameProps) {
    const { user1, user2 } = route.params;
    const [winner, setWinner] = React.useState<string | null>(null);
    const [isCross, setIsCross] = React.useState<boolean>(true);
    const [gameState, setGameState] = React.useState<string[]>(Array(9).fill('empty'));

    const handlePress = (index: number) => {
        if (gameState[index] !== 'empty' || winner) return;

        const newGameState = [...gameState];
        newGameState[index] = isCross ? 'cross' : 'circle';
        setGameState(newGameState);
        setIsCross(!isCross);
        checkIsWinner(newGameState);
    };

    const checkIsWinner = (state: string[]) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                state[a] !== 'empty' &&
                state[a] === state[b] &&
                state[b] === state[c]
            ) {
                setWinner(state[a] === 'cross' ? user1.name : user2.name);
                Alert.alert('Game Over', `${state[a] === 'cross' ? user1.name : user2.name} wins!`);
                return;
            }
        }

        if (!state.includes('empty')) {
            setWinner('Draw');
            Alert.alert('Game Over', "It's a draw!");
        }
    };

    const resetGame = () => {
        setGameState(Array(9).fill('empty'));
        setIsCross(true);
        setWinner(null);
    };

    const renderCell = (index: number) => {
        return (
            <Button
                type="outline"
                key={index}
                buttonStyle={styles.cell}
                titleStyle={styles.cellText}
                title={
                    gameState[index] === 'cross' ? 'X' : gameState[index] === 'circle' ? 'O' : ''
                }
                onPress={() => handlePress(index)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>
                Tic Tac Toe
            </Text>

            <Text h4 style={styles.playerTurn}>
                {winner ? `Winner: ${winner}` : `Turn: ${isCross ? user1.name : user2.name}`}
            </Text>

            <Card containerStyle={styles.board}>
                <View style={styles.row}>{[0, 1, 2].map(renderCell)}</View>
                <View style={styles.row}>{[3, 4, 5].map(renderCell)}</View>
                <View style={styles.row}>{[6, 7, 8].map(renderCell)}</View>
            </Card>

            <Button
                title="Reset Game"
                onPress={resetGame}
                buttonStyle={styles.resetButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        marginBottom: 20,
    },
    playerTurn: {
        marginBottom: 10,
    },
    board: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    cell: {
        width: 80,
        height: 80,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    resetButton: {
        marginTop: 20,
        backgroundColor: '#2196f3',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});
