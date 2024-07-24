import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import Empty from './Empty';

function Scanner({ visible, data, setData, close }) {
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);

  const handle = async ({ type, data }) => {
    setData(data);

    console.log('TYPE', type);
    console.log('DATA', data);

    close();
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
          <CameraView
            style={StyleSheet.absoluteFillObject}
            onBarcodeScanned={handle}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13']
            }}
          />
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
  }
});

export default Scanner;
