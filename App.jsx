import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
  Linking,
  useWindowDimensions
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
  const [connectedDeviceWAN, setConnectedDeviceWAN] = useState(null);
  const [connectionLink, setConnectionLink] = useState(null);
  const [deviceCode, setDeviceCode] = useState(null);
  const [deviceNumber, setBatteryNumber] = useState(null);
  const [factoryVoltage, setFactoryVoltage] = useState(null);
  const [factoryCapacity, setFactoryCapacity] = useState(null);
  const [streamURL, setStreamURL] = useState(null);
  const [dataWAN, setDataWAN] = useState(null);
  const [mode, setMode] = useState(1);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const streamWAN = (url) => {
    fetch(url).then(res => res.text().then(res => {
      try {
        const rawData = res.split(',');
        const [totalVolt, capacity, temp, current, accumulated] = rawData.slice(0, 5);
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
          temp,
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

  const disconnect = () => {
    setConnectionLink(null);
    disconnectBLE();
    disconnectWAN();
  };

  useEffect(() => {
    setConnectionLink(null);

    Linking.addEventListener('url', e => setConnectionLink(e.url));

    Linking.getInitialURL().then(url => {
      scan();
      setConnectionLink(url);
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
  const height = windowHeight * ((windowWidth <= 320) ? 1.2 : 1);
  const margin = (windowWidth <= 320) ? 20 : 50;
  const scale = (windowWidth <= 320) ? 0.9 : 1;

  return (
    <ImageBackground
      style={{
        width: windowWidth,
        height: windowHeight + 50,
        position: 'absolute',
        zIndex: -1
      }}
      source={require('./assets/images/bg.png')}
      resizeMode='cover'
    >
      <ScrollView>
        <SafeAreaView style={{
          transform: [{ scale }],
          marginTop: margin
        }}>
          {connectedDevice ? (
            <>
              <Display
                data={data}
                deviceCode={deviceCode}
                deviceNumber={deviceNumber}
                factoryVoltage={factoryVoltage}
                factoryCapacity={factoryCapacity}
                disconnect={disconnect}
                height={height}
              />
              <Toast visibilityTime={3000} />
            </>
          ) : (
            <Scanner
              bluetoothPermissionsEnabled={bluetoothPermissionsEnabled}
              connected={!!connectedDevice}
              devices={devices}
              setMode={setMode}
              connectionLink={connectionLink}
              setConnectionLink={setConnectionLink}
              setDeviceCode={setDeviceCode}
              setBatteryNumber={setBatteryNumber}
              setFactoryVoltage={setFactoryVoltage}
              setFactoryCapacity={setFactoryCapacity}
              connectBLE={connectBLE}
              connectWAN={connectWAN}
              height={windowHeight}
            />
          )}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

export default App;
