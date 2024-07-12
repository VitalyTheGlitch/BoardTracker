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
import Devices from './Devices';
import Display from './Display';

function App() {
  const {
    requestPermissions,
    scanDevices,
    connectToDevice,
    disconnectFromDevice,
    devices,
    connectedDevice,
    data
  } = useBLE();

  const [permissionsEnabled, setPermissionsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const scan = async () => {
    const permissionsEnabled = await requestPermissions();

    setPermissionsEnabled(permissionsEnabled);

    if (permissionsEnabled) scanDevices();
  }

  const open = async () => {
    scan();

    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.startWrapper}>
        {connectedDevice ? (
          <Display device={connectedDevice} data={data} />
        ) : (
          <Text style={styles.startTitle}>
            Нажмите кнопку ниже и выберите устройство
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={connectedDevice ? disconnectFromDevice : open}
      >
        <Text style={styles.buttonText}>
          {connectedDevice ? 'Отключить' : 'Начать'}
        </Text>
      </TouchableOpacity>
      <Devices
        visible={modalVisible}
        permissionsEnabled={permissionsEnabled}
        devices={devices}
        connectToDevice={connectToDevice}
        close={() => setModalVisible(false)}
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
    backgroundColor: '#c10030',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
