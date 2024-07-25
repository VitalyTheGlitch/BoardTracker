import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function Battery({ id, voltage }) {
  const height = voltage + '%';
  const batteryStyle = [styles.battery, id % 4 == 0 && { marginLeft: 50 }];
  const chargeStyle = [styles.charge, { height }];

  if (voltage <= 20) chargeStyle.push(styles.chargeLow);

  else if (voltage <= 50) chargeStyle.push(styles.chargeMedium);

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
    width: 60,
    height: 100,
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5
  },
  batteryHead: {
    width: 20,
    height: 10,
    backgroundColor: '#000',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#333',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center'
  },
  batteryBody: {
    position: 'relative',
    width: 60,
    height: 100,
    backgroundColor: '#000',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  batteryBodyAfter: {
    position: 'absolute',
    top: '50%',
    width: 60,
    height: 100,
    borderWidth: 4,
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: '#333'
  },
  charge: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 'inherit',
    borderRadius: 16,
    backgroundColor: '#53bfbd'
  },
  chargeMedium: {
    backgroundColor: '#decc1b'
  },
  chargeLow: {
    width: '90%',
    backgroundColor: '#bd1010'
  },
  text: {
    zIndex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#fff'
  }
});

export default Battery;
