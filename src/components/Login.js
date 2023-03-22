import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {authLogin, getAPI} from '../utils/api';
import {Picker} from '@react-native-picker/picker';

const Login = () => {
    const [ID, setpublicId] = useState('2365716535');
    const [token, setToken] = useState('NULL');
    const [method, setMethod] = useState('');
    const [url, setUrl] = useState('/bots/pairs/signal');
    const [text, setText] = useState({});
    const [body, setBody] = useState(
        '{"side": "buy","bot_id": "cloudcloudcloud","ticker": "MBL", "amount": "3","trade_price": "3000","price": "3200","pl_rate": "3","template_num": "b_crossdown_rsi40"}',
    );

    const onPress = async ID => {
        const data = await authLogin(ID);
        setToken(data.token);
    };
    const apply = async (token, method, url, body) => {
        const data =
            method === 'GET'
                ? await getAPI(token, method, url)
                : await getAPI(token, method, url, body);
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
            <Picker
                selectedValue={method}
                onValueChange={(itemValue, itemIndex) => setMethod(itemValue)}>
                <Picker.Item label="GET" value="GET" />
                <Picker.Item label="POST" value="POST" />
            </Picker>
            <View style={styles.block}>
                <TextInput
                    style={styles.input}
                    placeholder="URL"
                    value={url}
                    onChangeText={setUrl}
                />
                <Button
                    title="apply"
                    style={styles.buttonStyle}
                    onPress={() => apply(token, method, url, body)}
                />
            </View>
            <View
                style={{
                    height: 96,
                    backgroundColor: '#ffffff',
                    flexDirection: 'row',
                }}>
                <TextInput
                    style={styles.input}
                    placeholder="body"
                    value={body}
                    onChangeText={setBody}
                    multiline
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
