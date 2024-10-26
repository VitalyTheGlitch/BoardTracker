import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function Cell({ id, voltage }) {
  if (voltage < 2.5) voltage = 2.5;

  else if (voltage > 3.75) voltage = 3.75;

  const percentage = voltage ? ((voltage - 2.5) * 100) / 1.25 : 0;
  const chargeStyle = [styles.charge, { height: percentage + '%' }];
  const colors = {
    full: '#c3feff',
    high: '#4ec0c1',
    medium: '#c1a74e',
    low: '#c14e4e'
  }

  const headColor = percentage >= 99 ? colors.full  : '#366f6f';
  const headStyle = [styles.batteryHead, { borderColor: headColor }]

  let backgroundColor;

  if (percentage <= 20) backgroundColor = colors.low;

  else if (percentage <= 50) backgroundColor = colors.medium;

  else if (percentage < 99) backgroundColor = colors.high;

  else backgroundColor = colors.full;

  chargeStyle.push({ backgroundColor });

  return (
    <View style={styles.battery}>
      <View style={[styles.batteryHead, headStyle]}>
        <View style={styles.batteryBody}>
          <Text style={styles.text}>{voltage}В</Text>
          <View style={chargeStyle} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  battery: {
    width: 35,
    height: 60,
    marginHorizontal: 5,
    marginVertical: 10
  },
  batteryHead: {
    width: 15,
    height: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    alignItems: 'center'
  },
  batteryBody: {
    position: 'relative',
    width: 35,
    height: 60,
    backgroundColor: '#366f6f',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  charge: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 'inherit',
    borderRadius: 2
  },
  text: {
    zIndex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#000'
  }
});

export default Cell;

  // batteryBody: {
  //   position: 'relative',
  //   overflow: 'hidden',
  //   top: 5,
  //   width: 70,
  //   height: 120,
  //   backgroundColor: '#366f6f',
  //   borderWidth: 1,
  //   borderStyle: 'solid',
  //   borderColor: '#153535',
  //   borderRadius: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // }