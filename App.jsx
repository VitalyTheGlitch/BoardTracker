import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import useBLE from './useBLE';
import Devices from './components/Devices';
import Scanner from './components/Scanner';
import Display from './components/Display';

function App() {
  const {
    requestPermissions,
    scanDevices,
    connectToDevice,
    disconnectFromDevice,
    devices,
    connectedDevice,
    data: bluetoothData
  } = useBLE();

  const [permissionsEnabled, setPermissionsEnabled] = useState(false);
  const [devicesVisible, setDevicesVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [factoryCapacity, setFactoryCapacity] = useState(null);

  const scan = async () => {
    const permissionsEnabled = await requestPermissions();

    setPermissionsEnabled(permissionsEnabled);

    if (permissionsEnabled) scanDevices();
  }

  const open = async () => {
    scan();

    setDevicesVisible(true);
  };

  return (
    <View style={styles.container}>
      {connectedDevice ? (
        <Display
          device={connectedDevice}
          data={bluetoothData}
          factoryCapacity={factoryCapacity}
        />
        ) : (
        <View style={styles.startWrapper}>
          <Text style={styles.startTitle}>
            Нажмите кнопку ниже, чтобы начать
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={connectedDevice ? disconnectFromDevice : open}
      >
        <Text style={styles.buttonText}>
          {connectedDevice ? 'Отключить' : 'Начать'}
        </Text>
      </TouchableOpacity>
      <Devices
        visible={devicesVisible}
        permissionsEnabled={permissionsEnabled}
        devices={devices}
        connectToDevice={connectToDevice}
        close={() => setDevicesVisible(false)}
      />
      <Scanner
        visible={scannerVisible}
        devices={devices}
        connectToDevice={connectToDevice}
        setFactoryCapacity={setFactoryCapacity}
        close={() => setScannerVisible(false)}
      />
      <Toast visibilityTime={3000} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  startWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  },
  button: {
    height: 50,
    backgroundColor: '#53bfbd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default App;
