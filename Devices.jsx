import { useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Modal,
  StyleSheet
} from 'react-native';

function Device({ item, connectToDevice, close }) {
  const connect = useCallback(() => {
    connectToDevice(item);

    close();
  }, [item, connectToDevice, close]);
  
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={connect}
    >
      <Text style={styles.buttonText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

function Devices({ visible, permissionsEnabled, devices, connectToDevice, close }) {
  const renderItem = ({ item }) => {
    return (
      <Device
        item={item}
        connectToDevice={connectToDevice}
        close={close}
      />
    );
  }

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
    >
      <View style={styles.container}>
        {permissionsEnabled ? (
          <>
            <Text style={styles.title}>Нажмите на устройство, чтобы подключиться</Text>
            <FlatList
              contentContainerStyle={styles.list}
              data={devices}
              renderItem={renderItem}
            />
          </>
        ) : (
          <>
            <View style={styles.noWrapper}>
              <Text style={styles.noTitle}>Предоставьте приложению необходимые разрешения</Text>
            </View>
          </>
        )}
      </View>
   </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  },
  list: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 20
  },
  button: {
    height: 50,
    backgroundColor: '#c10030',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  noWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noTitle: {
    color: '#c10030',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  },
});

export default Devices;
