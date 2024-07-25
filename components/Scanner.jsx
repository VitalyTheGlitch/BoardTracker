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

const reFactoryCapacity = /\d+(?=AH)/g;
const reNumber = /(?<=AH)\d{4}/g;

function Scanner({ visible, devices, connectToDevice, setFactoryCapacity, close }) {
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);

  const connect = useCallback((device) => {
    connectToDevice(device);

    close();
  }, []);

  const handle = async ({ type, data }) => {
    const factoryCapacity = (data.match(reFactoryCapacity)?.[0] ?? '').slice(2);
    const number = Number(data.match(reNumber)?.[0]);

    if (!factoryCapacity || !number) {
      setTimeout(() => Toast.show({
        type: 'info',
        text1: 'Неправильный QR-код!'
      }), 100);

      close();

      return;
    }

    const device = devices.find((device) => device.name.includes(number));

    if (!device) {
      setTimeout(() => Toast.show({
        type: 'info',
        text1: 'Устройство не найдено!'
      }), 100);

      close();

      return;
    }

    setFactoryCapacity(factoryCapacity);
    connect(device);
  }

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      setPermissionsEnabled(status === 'granted');
    };

    requestPermissions();
  }, []);

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
    >
      <View style={styles.container}>
        {permissionsEnabled ? (
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
