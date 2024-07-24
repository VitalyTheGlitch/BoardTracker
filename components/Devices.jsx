import { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Modal,
  StyleSheet
} from 'react-native';
import Empty from './Empty';

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
  const renderDevice = ({ item }) => (
    <Device
      item={item}
      connectToDevice={connectToDevice}
      close={close}
    />
  );

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
              keyExtractor={({ id }) => id.toString()}
              renderItem={renderDevice}
              ListEmptyComponent={() => <Empty />}
            />
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
    backgroundColor: '#53bfbd',
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
  }
});

export default Devices;
