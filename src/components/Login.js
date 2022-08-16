import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const API_URI = 'https://reabit.kr/v1';

const authLogin = async ID => {
    const response = await fetch(`${API_URI}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            publicId: ID,
        }),
    });
    const data = await response.json();

    return data;
};

const api = async (token, method) => {
    const response = await fetch(`${API_URI}/publics`, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    return data;
};

const Login = () => {
    const [ID, setpublicId] = useState('');
    const [token, setToken] = useState('NULL');
    const [method, setMethod] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');

    const onPress = async ID => {
        const data = await authLogin(ID);
        setToken(data.token);
    };
    const apply = async (token, method) => {
        const data = await api(token, method);
        setText(data);
    };
    return (
        <View>
            <View style={styles.block}>
                <TextInput
                    placeholder="PublicID"
                    style={styles.input}
                    value={ID}
                    onChangeText={setpublicId}
                />
                <Button
                    title="Login"
                    style={styles.buttonStyle}
                    onPress={() => onPress(ID)}
                />
            </View>
            <Text>{token}</Text>
            <View style={styles.block}>
                <TextInput
                    placeholder="Method"
                    value={method}
                    onChangeText={setMethod}
                />
                <TextInput
                    style={styles.input}
                    placeholder="URL"
                    value={url}
                    onChangeText={setUrl}
                />
                <Button
                    title="apply"
                    style={styles.buttonStyle}
                    onPress={() => apply(token, method)}
                />
            </View>
            <Text>{method}</Text>
            <Text>{url}</Text>
            <Text>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        backgroundColor: '#e0e0e0',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    buttonStyle: {},
});

export default Login;
