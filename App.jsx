import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import useBLE from './useBLE';
import Scanner from './components/Scanner';
import Display from './components/Display';

function App() {
  const {
    requestPermissions,
    scanDevices,
    devices,
    data: dataBLE,
    connectToDevice: connectBLE,
    disconnectFromDevice: disconnectBLE,
    connectedDevice: connectedDeviceBLE
  } = useBLE();

  const [bluetoothPermissionsEnabled, setBluetoothPermissionsEnabled] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [connectedDeviceWAN, setConnectedDeviceWAN] = useState(null);
  const [connectionLink, setConnectionLink] = useState(null);
  const [factoryVoltage, setFactoryVoltage] = useState(null);
  const [factoryCapacity, setFactoryCapacity] = useState(null);
  const [streamURL, setStreamURL] = useState(null);
  const [dataWAN, setDataWAN] = useState(null);
  const [mode, setMode] = useState(1);

  const streamWAN = (url) => {
    fetch(url).then(res => res.text().then(res => {
      try {
        const rawData = res.split(',');
        const [totalVolt, capacity, tempC, current, accumulated] = rawData.slice(0, 5);
        const rawSingleData = rawData.slice(5)[0].split('|');
        const voltMin = Math.min(...rawSingleData) / 100;
        const voltMax = Math.max(...rawSingleData) / 100;
        const voltDiff = (Math.round((voltMax - voltMin) * 100) / 100).toFixed(2);
        const cycle = Math.round(accumulated / factoryCapacity);
        const singleData = [];

        for (let i = 0; i < rawSingleData.length; ++i)
          singleData.push({ id: i, voltage: rawSingleData[i] / 100 });

        const data = {
          totalVolt: totalVolt / 100,
          capacity,
          tempC,
          voltMin,
          voltMax,
          voltDiff,
          current,
          cycle,
          singleData
        };

        setDataWAN(data);
      } catch (e) {
        console.log(e);

        disconnect();

        setTimeout(() => Toast.show({
          type: 'info',
          text1: 'Соединение оборвано!'
        }), 500);

        return;
      }
    }));
  };

  const connectWAN = (device) => {
    const url = 'https://battchain.ru/cgi-bin/bms/app.cgi?bid=' + device;
    
    setConnectedDeviceWAN(device);
    setStreamURL(url);
  };

  const disconnectWAN = () => {
    if (connectedDeviceWAN) {
      setStreamURL(null);
      setDataWAN(null);
      setConnectedDeviceWAN(null);
    }
  };

  const scan = async () => {
    const bluetoothPermissionsEnabled = await requestPermissions();

    setBluetoothPermissionsEnabled(bluetoothPermissionsEnabled);

    if (bluetoothPermissionsEnabled) scanDevices();
  };

  const open = (url) => {
    if (url) setConnectionLink(url);

    setScannerVisible(true);
  };

  const close = () => {
    setConnectionLink(null);
    setScannerVisible(false);
  };

  const disconnect = () => {
    disconnectBLE();
    disconnectWAN();

    open(null);
  };

  useEffect(() => {
    setConnectionLink(null);

    Linking.addEventListener('url', e => open(e.url));

    Linking.getInitialURL().then(url => {
      scan();
      open(url);
    }).catch(console.warn);

    return () => Linking.removeAllListeners('url');
  }, []);

  useEffect(() => {
    if (!streamURL) return;

    const task = setInterval(() => streamWAN(streamURL), 1000);

    return () => clearInterval(task);
  }, [streamURL]);

  const connectedDevice = mode ? connectedDeviceBLE?.name : connectedDeviceWAN;
  const data = mode ? dataBLE : dataWAN;

  return (
    <View style={styles.container}>
      {connectedDevice ? (
        <Display
          device={connectedDevice}
          mode={mode}
          data={data}
          factoryVoltage={setFactoryVoltage}
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
        onPress={connectedDevice ? disconnect : () => open(null)}
      >
        <Text style={styles.buttonText}>
          {connectedDevice ? 'Отключить' : 'Начать'}
        </Text>
      </TouchableOpacity>
      <Scanner
        visible={scannerVisible}
        bluetoothPermissionsEnabled={bluetoothPermissionsEnabled}
        connected={!!connectedDevice}
        devices={devices}
        setMode={setMode}
        connectionLink={connectionLink}
        connectBLE={connectBLE}
        connectWAN={connectWAN}
        setFactoryVoltage={setFactoryVoltage}
        setFactoryCapacity={setFactoryCapacity}
        close={close}
      />
      {!scannerVisible && <Toast visibilityTime={3000} />}
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
