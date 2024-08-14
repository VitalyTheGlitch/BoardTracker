import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

const icons = {
  capacity: require('../assets/icons/capacity.png'),
  totalVolt: require('../assets/icons/totalVolt.png'),
  current: require('../assets/icons/current.png'),
  voltMax: require('../assets/icons/voltMax.png'),
  voltMin: require('../assets/icons/voltMin.png'),
  voltDiff: require('../assets/icons/voltDiff.png'),
  temp: require('../assets/icons/temp.png'),
  cycle: require('../assets/icons/cycle.png'),
  factoryCapacity: require('../assets/icons/factoryCapacity.png')
};

function Indicator({ icon, label, data, color='#000' }) {
  return (
    <View style={styles.indicator}>
      <View style={styles.iconWrapper}>
        <Image style={styles.icon} source={icon} />
      </View>
      <View style={styles.rightWrapper}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.data, { color }]}>{data}</Text>
      </View>
    </View>
  );
}

function Indicators({ data, factoryCapacity }) {
  const tempColor = '#000';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Indicator icon={icons.capacity} label='Емк.' data={data.capacity} />
        <Indicator icon={icons.totalVolt} label='Напр.' data={data.totalVolt} />
        <Indicator icon={icons.current} label='Ток' data={data.current} />
      </View>
      <View style={styles.row}>
        <Indicator icon={icons.voltMin} label='Мин.' data={data.voltMin} />
        <Indicator icon={icons.voltMax} label='Макс.' data={data.voltMax} />
        <Indicator icon={icons.voltDiff} label='Разн.' data={data.voltDiff} />
      </View>
      <View style={styles.row}>
        <Indicator icon={icons.temp} label='°C' data={data.tempC} color={tempColor} />
        <Indicator icon={icons.cycle} label='Цикл' data={data.cycle} />
        {factoryCapacity && <Indicator icon={icons.factoryCapacity} label='Н. емк.' data={factoryCapacity} color={tempColor} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    gap: 5,
    marginVertical: 5,
    marginHorizontal: -10
  },
  indicator: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#53bfbd',
    alignItems: 'center',
    borderRadius: 10
  },
  iconWrapper: {
    flexDirection: 'column',
    width: 48,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightWrapper: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  icon: {
    width: 24,
    height: 24
  },
  label: {
    fontWeight: 'bold'
  },
  data: {
    fontWeight: '500'
  }
});

export default Indicators;
