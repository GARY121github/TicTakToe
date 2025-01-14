import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import { Input } from '@rneui/themed';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const UserSchema = Yup.object().shape({
    username1: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
    username2: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
});

export default function Home({ navigation }: HomeProps) {
    const [user1, setUser1] = React.useState<User | null>(null);
    const [user2, setUser2] = React.useState<User | null>(null);

    const startGame = (values: { username1: string; username2: string }) => {
        setUser1({ name: values.username1 });
        setUser2({ name: values.username2 });

        navigation.navigate('Game', {
            user1: { name: values.username1 },
            user2: { name: values.username2 },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Tic Tac Toe</Text>
            <Text style={styles.subHeadingText}>Enter the names of the two players</Text>

            <Formik
                validationSchema={UserSchema}
                initialValues={{ username1: '', username2: '' }}
                onSubmit={startGame}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Player 1</Text>
                            <Input
                                onChangeText={handleChange('username1')}
                                onBlur={handleBlur('username1')}
                                value={values.username1}
                                placeholder="Enter name"
                                errorMessage={touched.username1 && errors.username1 ? errors.username1 : ''}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Player 2</Text>
                            <Input
                                onChangeText={handleChange('username2')}
                                onBlur={handleBlur('username2')}
                                value={values.username2}
                                placeholder="Enter name"
                                errorMessage={touched.username2 && errors.username2 ? errors.username2 : ''}
                            />
                        </View>

                        <Button
                            title="Start Game"
                            onPress={handleSubmit as any}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonText}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    headingText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
        textAlign: 'center',
    },
    subHeadingText: {
        fontSize: 18,
        color: '#34495e',
        marginBottom: 20,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#34495e',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#1abc9c',
        borderRadius: 5,
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});
