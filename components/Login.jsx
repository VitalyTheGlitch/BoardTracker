import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Empty from './Empty';

function Login({ width, height }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { onLogin } = useAuth();

  const login = async () => {
    setLoading(true);

    const result = await onLogin(email, password);

    setLoading(false);

    if (result?.error) alert(result.message);
  };

  if (loading) return <Empty width={width} />;
  
  return (
    <View
      style={{
        width,
        height,
        alignItems: 'center'
      }}
    >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '33%'
        }}>
          <Text style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#4ec0c1'
          }}>
            Войдите в аккаунт
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#4ec0c1'
          }}>
            Чтобы получить доступ к другим функциям
          </Text>
        </View>
        <View style={{
          marginTop: 50,
          paddingHorizontal: 24
        }}>
          <View>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#4ec0c1',
              marginBottom: 10
            }}>
              Электронная почта
            </Text>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: '500',
                color: '#222',
                borderWidth: 1,
                borderColor: '#4ec0c1',
                borderStyle: 'solid',
                marginBottom: 20
              }}
              autoCorrect={false}
              autoCapitalize='none'
              clearButtonMode='while-editing'
              keyboardType='email-address'
              placeholder='example@battchain.ru'
              placeholderTextColor='#999'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#4ec0c1',
              marginBottom: 10
            }}>
              Пароль
            </Text>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#fff',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#4ec0c1',
                borderStyle: 'solid',
                fontSize: 16,
                fontWeight: '500',
                color: '#222',
                paddingHorizontal: 16
              }}
              autoCorrect={false}
              secureTextEntry={true}
              clearButtonMode='while-editing'
              placeholder='********'
              placeholderTextColor='#999'
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View>
            <View
              style={{
                width: 320,
                height: 60,
                marginTop: 60
              }}
            >
              <TouchableOpacity
                style={{
                  zIndex: 1
                }}
                onPress={login}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: '#4ec0c1',
                    marginTop: 12
                  }}
                >
                  Войти
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#0c1716',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#4ec0c1',
                  borderStyle: 'solid',
                  position: 'absolute'
                }}
              />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Login;
