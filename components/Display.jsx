import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import Indicators from './Indicators';
import Battery from './Battery';
import Empty from './Empty';

function Display({ device, data }) {
  if (!data) return <Empty />;

  const renderBattery = ({ item }) => <Battery id={item.id} voltage={item.voltage} />;

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>{device.name}</Text>
      </View>
      <View style={styles.display}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Общая информация</Text>
        </View>
        <Indicators data={data} />
        {/*<View style={styles.header}>
          <Text style={styles.headerText}>Напряжения на ячейках</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          numColumns={4}
          data={data.singleData}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderBattery}
        />*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#111',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  display: {
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
    marginHorizontal: -20,
    paddingBottom: 20
  },
  header: {
    borderRadius: 2,
    paddingVertical: 10,
    marginBottom: 5,
    elevation: 2
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#53bfbd',
    textAlign: 'center'
  },
  topHeader: {
    backgroundColor: '#53bfbd',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
});

export default Display;
