import { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Animated,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import Indicators from './Indicators';
import Batteries from './Batteries';
import Empty from './Empty';

const icons = {
  bluetooth: require('../assets/icons/bluetooth.png')
};

function Display({ device, mode, data, factoryVoltage, factoryCapacity }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const width = useWindowDimensions().width / 1.15;

  if (!data) return <Empty />;

  const renderMonitors = ({ item }) => {
    if (!item) return (
      <View style={ width }>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Общая информация</Text>
          </View>
        </View>
        <Indicators data={data} factoryCapacity={factoryCapacity} />
      </View>
    );

    return (
      <View style={ width }>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Напряжения на ячейках</Text>
          </View>
        </View>
        <Batteries data={data.singleData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderText}>{device}</Text>
        {!!mode && <Image style={styles.icon} source={icons.bluetooth} />}
      </View>
      <View style={{ flex: 3 }}>
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Общая информация</Text>
      </View>
      <Indicators data={data} factoryCapacity={factoryCapacity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 20
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5
  },
  header: {
    width: '80%',
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
    flexDirection: 'row',
    backgroundColor: '#53bfbd',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 10
  },
  topHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
});

export default Display;
