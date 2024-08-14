import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import Battery from './Battery';

function Batteries({ data }) {
  const renderBattery = ({ item }) => <Battery id={item.id} voltage={item.voltage} />;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={4}
        data={data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderBattery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
    marginHorizontal: -20,
    paddingBottom: 20
  }
});

export default Batteries;
