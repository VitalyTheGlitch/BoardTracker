import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet
} from 'react-native';
import Toast from 'react-native-toast-message';
import { CameraView, Camera } from 'expo-camera';
import Empty from './Empty';

const reParams = /[?&]([^=#]+)=([^&#]*)/g;
const reFactoryCapacity = /\d+(?=AH)/g;
const reNumber = /(?<=AH)\d{4}/g;

function Scanner({
  visible,
  bluetoothPermissionsEnabled,
  connected,
  devices,
  setMode,
  connectionLink,
  connectBLE,
  connectWAN,
  setFactoryVoltage,
  setFactoryCapacity,
  close
}) {
  const [cameraPermissionsEnabled, setCameraPermissionsEnabled] = useState(false);

  const connect = (device, mode, factoryCapacity) => {
    if (mode) connectBLE(device, factoryCapacity);

    else connectWAN(device);

    close();
  };

  const handle = ({ data }) => {
    if (connected) return;

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

        return;
      }
    } else device = number;

    setMode(mode);

    if (device) {
      setFactoryVoltage(factoryVoltage);
      setFactoryCapacity(factoryCapacity);
      connect(device, mode, factoryCapacity);
    }
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

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
    >
      <View style={styles.container}>
        {bluetoothPermissionsEnabled && cameraPermissionsEnabled ? (
          <>
            <Text style={styles.title}>Наведите камеру на QR-код устройства</Text>
            <View style={styles.wrapper}>
              <View style={styles.cameraWrapper}>
                <CameraView
                  style={styles.camera}
                  onBarcodeScanned={handle}
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr']
                  }}
                />
              </View>
              <View style={styles.cameraAfter} />
            </View>
          </>
        ) :
          <Empty permissions={true} />
        }
      </View>
      <Toast visibilityTime={3000} />
   </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraWrapper: {
    width: '80%',
    height: '80%',
    borderWidth: 4,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#53bfbd'
  },
  camera: {
    width: '100%',
    height: '100%'
  },
  cameraAfter: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    borderWidth: 4,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#53bfbd'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 20
  }
});

export default Scanner;
