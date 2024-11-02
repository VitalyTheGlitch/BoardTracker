import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);

	return buf.map(() => Math.floor(isaac.random() * 256));
});

const AUTH_URL = 'https://battchain.ru/cgi-bin/bms/app.cgi?email=';
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		email: null,
		password: null,
		authenticated: null
	});

	useEffect(() => {
		const loadCredentials = async () => {
			const email = await SecureStore.getItemAsync('email');
			const password = await SecureStore.getItemAsync('password');

			if (password)
				setAuthState({
					email,
					password,
					authenticated: true
				});
		}

		loadCredentials();
	}, []);

	const login = async (email, password) => {
		try {
	    const hash = await fetch(AUTH_URL + email).then(res => res.text().then(res => res.split(',')[6]));
    	
    	if (bcrypt.compareSync(password, hash)) {
	    	setAuthState({
	    		email,
	    		password,
	    		authenticated: true
	    	});

	    	await SecureStore.setItemAsync('email', email);
	    	await SecureStore.setItemAsync('password', password);
	    	return;
    	}

    	throw 'Неверный пароль!';
    } catch (e) {
      return { error: true, message: e };
    }
	}

	const logout = async () => {
		await SecureStore.deleteItemAsync('email');
		await SecureStore.deleteItemAsync('password');

		setAuthState({
			email: null,
			password: null,
			authenticated: null
		});
	}

	const value = {
		onLogin: login,
		onLogout: logout,
		authState
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
