import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import Cell from './Cell';

function Cells({ data }) {
  const renderBattery = ({ item }) => <Cell id={item.id} voltage={item.voltage} />;

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
    minWidth: 300,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    paddingBottom: 20
  }
});

export default Cells;
