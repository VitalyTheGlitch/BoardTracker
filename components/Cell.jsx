import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function Cell({ id, voltage }) {
  if (voltage < 2.5) voltage = 2.5;

  else if (voltage > 3.75) voltage = 3.75;

  const percentage = voltage ? ((voltage - 2.5) * 100) / 1.25 : 0;
  const batteryStyle = [styles.battery, { transform: [{ scale: 2 }] }, id % 4 == 0 && { marginLeft: 50 }];
  const chargeStyle = [styles.charge, { height: percentage + '%' }];
  const colors = {
    high: '#c3feff',
    medium: '#c1a74e',
    low: '#c14e4e'
  }

  let backgroundColor;

  if (percentage <= 20) backgroundColor = colors.low;

  else if (percentage <= 50) backgroundColor = colors.medium;

  else backgroundColor = colors.high;

  chargeStyle.push({ backgroundColor });

  return (
    <View style={batteryStyle}>
      <View style={styles.batteryHead}>
        <View style={styles.batteryBody}>
          <Text style={styles.text}>{voltage}</Text>
          <View style={chargeStyle} />
        </View>
        <View style={styles.batteryBodyAfter} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  battery: {
    flexDirection: 'row',
    width: 70,
    height: 120,
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5
  },
  batteryHead: {
    width: 30,
    height: 0,
    backgroundColor: '#366f6f',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#153535',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    alignItems: 'center'
  },
  batteryBody: {
    position: 'relative',
    width: 70,
    height: 120,
    backgroundColor: '#366f6f',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#153535',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  batteryBodyAfter: {
    position: 'absolute',
    top: '50%',
    width: 70,
    height: 120,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#153535'
  },
  charge: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 'inherit',
    borderRadius: 8
  },
  text: {
    zIndex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#fff'
  }
});

export default Cell;
