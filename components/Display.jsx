import { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Animated,
  StyleSheet
} from 'react-native';
import Indicators from './Indicators';
import Batteries from './Batteries';
import Empty from './Empty';

function Display({ device, data, factoryCapacity }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  if (!data) return <Empty />;

  const renderMonitors = ({ item }) => {
    if (item == 0) return (
      <View style={styles.display}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Общая информация</Text>
          </View>
          <Indicators data={data} factoryCapacity={factoryCapacity} />
      </View>
    );

    if (item == 1) return (
      <View style={styles.display}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Напряжения на ячейках</Text>
          </View>
          <Batteries data={data.singleData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>{device.name}</Text>
      </View>
      <View style={{ flex: 3}}>
        <FlatList
          data={[0, 1]}
          keyExtractor={(id) => id.toString()}
          renderItem={renderMonitors}
          horizontal
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: {
                x: scrollX
              }
            }
          }], {
            useNativeDriver: false
          })}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  display: {
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  header: {
    borderRadius: 2,
    marginBottom: 5,
    paddingVertical: 10,
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
