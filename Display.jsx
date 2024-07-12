import { useState, useEffect } from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

function Display({ device, data }) {
  const [content, setContent] = useState([]);

  const { height } = useWindowDimensions();

  const count = Math.floor(height / 90);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cellTime}>{item.time}</Text>
        <Text style={styles.cell}>{item.temperature}</Text>
        <Text style={styles.cell}>{item.capacity}</Text>
        <Text style={styles.cell}>{item.voltage}</Text>
      </View>
    );
  }

  useEffect(() => {
    if (!data) return;

    setContent((prevState) => {
      while (prevState.length >= count) prevState.pop(0);

      return [...prevState, data];
    });
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>{device.name}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headingTime}>Время</Text>
        <Text style={styles.heading}>t</Text>
        <Text style={styles.heading}>C</Text>
        <Text style={styles.heading}>V</Text>
      </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={content}
          renderItem={renderItem}
        />
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
  topHeader: {
    backgroundColor: '#c10030',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    padding: 10
  },
  heading: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c10030',
    textAlign: 'center'
  },
  headingTime: {
    flex: 1,
    flexBasis: '30%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c10030',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#c10030',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: '#999',
    marginVertical: 5,
    padding: 10,
    elevation: 1
  },
  cell: {
    display: 'inline-block',
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: 40
  },
  cellTime: {
    flex: 1,
    flexBasis: '30%',
    height: 40,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: 20
  }
});

export default Display;
