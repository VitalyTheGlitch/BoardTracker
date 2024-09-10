import { useMemo, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { BleManager } from 'react-native-ble-plx';
import * as ExpoDevice from 'expo-device';
import base64 from 'react-native-base64';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const SERVICE_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

function useBLE() {
  const bleManager = useMemo(() => new BleManager(), []);

  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [data, setData] = useState(null);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Bluetooth scan permission',
        message: 'Board Tracker requires bluetooth scan',
        buttonPositive: 'OK'
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Bluetooth connect permission',
        message: 'Board Tracker requires bluetooth connections',
        buttonPositive: 'OK'
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Fine location permission',
        message: 'Board Tracker requires your fine location',
        buttonPositive: 'OK'
      }
    );

    return (
      bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
      bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
      fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if ((Platform.Version ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Fine location permission',
            message: 'Board Tracker requires your fine location',
            buttonPositive: 'OK'
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    }

    else return true;
  };

  const checkDevice = (devices, newDevice) => newDevice?.name &&
    newDevice.name.toLowerCase().includes('bat') &&
    devices.findIndex((device) => newDevice.id === device.id) == -1;

  const scanDevices = () => {
    setDevices([]);

    bleManager.startDeviceScan(null, null, (e, device) => {
      if (e) console.log(e);

      setDevices((prevState) => {
        if (checkDevice(prevState, device)) return [...prevState, device];

        return prevState;
      });
    });
  };

  const connectToDevice = async (device, factoryCapacity) => {
    try {
      await bleManager.connectToDevice(device.id);

      const connectedDevice = await bleManager.requestMTUForDevice(device.id, 30);

      setConnectedDevice(connectedDevice);

      await connectedDevice.discoverAllServicesAndCharacteristics();

      bleManager.stopDeviceScan();

      connectedDevice.monitorCharacteristicForService(
        SERVICE_UUID,
        SERVICE_CHARACTERISTIC,
        (e, c) => onDataUpdate(e, c, factoryCapacity)
      );

      Toast.show({ text1: 'Успешно подключено к ' + device.name + '!' });
    } catch (e) {  
      console.log(e);

      setTimeout(() => Toast.show({
        type: 'info',
        text1: 'Ошибка подключения!'
      }), 500);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);

      setConnectedDevice(null);
      setData(null);
    }
  };

  const onDataUpdate = (e, c, factoryCapacity) => {
    if (e || !c?.value) {
      console.log(e);

      setTimeout(() => Toast.show({
        type: 'info',
        text1: 'Отключено!'
      }), 500);

      disconnectFromDevice();

      return -1;
    }

    const res = base64.decode(c.value);
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

    setData(data);
  };

  return {
    requestPermissions,
    scanDevices,
    devices,
    data,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice
  };
}

export default useBLE;
