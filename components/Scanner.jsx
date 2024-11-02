import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { CameraView, Camera } from 'expo-camera';
import Empty from './Empty';

const reParams = /[?&]([^=#]+)=([^&#]*)/g;
const reFactoryCapacity = /\d+(?=AH)/g;
const reNumber = /(?<=AH)\d{4}/g;

function Scanner({
  bluetoothPermissionsEnabled,
  connected,
  devices,
  setMode,
  connectionLink,
  setConnectionLink,
  setDeviceCode,
  setBatteryNumber,
  setFactoryVoltage,
  setFactoryCapacity,
  connectBLE,
  connectWAN,
  height
}) {
  const [cameraPermissionsEnabled, setCameraPermissionsEnabled] = useState(false);
  const [title, setTitle] = useState(0);

  const connect = (device, mode, factoryCapacity) => {
    if (mode) connectBLE(device, factoryCapacity);

    else connectWAN(device);
  };

  const handle = ({ data }) => {
    if ((connected || connectionLink) && !((connectionLink ?? '').includes('lionsystems:'))) return;

    setConnectionLink(data);

    const params = {};
    let match;

    while (match = reParams.exec(data)) params[match[1]] = match[2];

    const mode = Number(params.mode) ?? 1;
    const battery = params.battery ?? '';
    const factoryData = (battery.match(reFactoryCapacity)?.[0] ?? '');
    const factoryVoltage = factoryData.slice(0, 2);
    const factoryCapacity = factoryData.slice(2);
    const number = Number(data.match(reNumber)?.[0]);

    if (!factoryVoltage || !factoryCapacity || !number) {
      Toast.show({
        type: 'info',
        text1: 'Недействительный QR-код!'
      });

      setTitle(1);

      return;
    }

    let device;

    if (mode) {
      device = devices.find((device) => device.name.includes(number));

      if (!device) {
        Toast.show({
          type: 'info',
          text1: 'Устройство не обнаружено!'
        });

        setTitle(1);

        return;
      }
    } else device = number;

    setMode(mode);

    if (device) {
      setDeviceCode(battery.split('AH')[0]);
      setBatteryNumber(number.toString().padStart(4, '0'));
      setFactoryVoltage(factoryVoltage);
      setFactoryCapacity(factoryCapacity);
      connect(device, mode, factoryCapacity);
    }
  }

  const reset = () => {
    setConnectionLink(null);
    setTitle(0);
  }

  useEffect(() => {
    if (!bluetoothPermissionsEnabled) return;

    const requestCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setCameraPermissionsEnabled(status === 'granted');
    };

    requestCameraPermissions();
  }, [bluetoothPermissionsEnabled]);

  useEffect(() => {
    if (devices.length && connectionLink) handle({ data: connectionLink });
  }, [devices, connectionLink]);

  const titles = [
    'Отсканируйте QR-код вашей АКБ',
    'Ошибка сканирования\nПопробуйте снова'
  ];

  return (
    <View>
      {bluetoothPermissionsEnabled && cameraPermissionsEnabled ? (
        <>
          <View
            style={{
              height: height,
              alignItems: 'center',
              paddingHorizontal: 20
            }}
          >
            <View style={{
                width: '90%',
                height: '50%',
                backgroundColor: '#000',
                borderWidth: 4,
                borderRadius: 10
            }}>
              <CameraView
                style={{
                  width: '100%',
                  height: '100%'
                }}
                onBarcodeScanned={handle}
                barcodeScannerSettings={{
                  barcodeTypes: ['qr']
                }}
              />
            </View>
            <View style={{
              position: 'absolute',
              width: '90%',
              height: '50%',
              borderWidth: 4,
              borderRadius: 10,
              borderStyle: 'solid',
              borderColor: '#53bfbd'
            }} />
            <Text
              style={{
                width: 320,
                height: 70,
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: '700',
                color: '#4ec0c1',
                textAlign: 'center',
                marginTop: 30
              }}
            >
              {titles[title]}
            </Text>
            <View
              style={{
                width: 320,
                height: 60,
                marginTop: 150
              }}
            >
              <TouchableOpacity
                style={{
                  zIndex: 1
                }}
                onPress={reset}
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
                  Сканировать
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
          <Toast visibilityTime={3000} />
        </>
      ) : <Empty permissions={true} />} 
   </View>
  );
}

export default Scanner;
