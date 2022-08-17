import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const API_URI = 'https://reabit.kr/v1';

// 호출 가능 API
// 로그인
// 회원 정보 조회
// API 키 조회
// 토큰 조회
// 팔로우 만료 목록 조회
// 마켓 아이디 조회
// 봇 페어 목록 조회
// 알람 목록 조회
// 공지사항 목록 조회
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

const api = async (token, method, url) => {
    const response = await fetch(`${API_URI}${url}`, {
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
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('/publics');
    const [text, setText] = useState({});

    const onPress = async ID => {
        const data = await authLogin(ID);
        setToken(data.token);
    };
    const apply = async (token, method, url) => {
        const data = await api(token, method, url);
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
            <View
                style={{
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 24,
                    }}>
                    {token === 'NULL' ? '...' : 'Login Success'}
                </Text>
            </View>
            <View style={styles.block}>
                <TextInput
                    style={{
                        fontSize: 18,
                        paddingVertical: 8,
                        paddingLeft: 8,
                        backgroundColor: '#e1e1e1',
                    }}
                    placeholder="Method"
                    value={method}
                    onChangeText={setMethod}
                    autoCapitalize={'characters'}
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
                    onPress={() => apply(token, method, url)}
                />
            </View>
            <Text style={styles.result}>
                {JSON.stringify(text).replace(/,/g, '\n')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        height: 48,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 8,
        paddingLeft: 8,
        backgroundColor: '#e0e0e0',
    },
    buttonStyle: {},
    result: {
        fontSize: 16,
        paddingLeft: 8,
    },
});

export default Login;
