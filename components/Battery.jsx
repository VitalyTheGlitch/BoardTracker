import { View, Image, StyleSheet } from 'react-native';

const charges = {
  normal: require('../assets/images/charge-normal.png'),
  low: require('../assets/images/charge-low.png')
}

function Battery({ level }) {
  if (level < 0) level = 0;

  else if (level > 100) level = 100;

  const headColor = level >= 99 ? '#c3feff' : '#366f6f';
  const headStyle = {
    backgroundColor: headColor,
    borderColor: headColor
  }
  const charge = level <= 20 ? charges.low : charges.normal;

  return (
    <View style={styles.battery}>
      <View style={[styles.batteryHead, headStyle]}>
        <View style={styles.batteryBody}>
          <Image
            style={{
              position: 'absolute',
              bottom: 0,
              height: level * 1.8 + '%',
              width: '100%',
              overflow: 'hidden'
            }}
            source={charge}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  battery: {
    width: 70,
    height: 120
  },
  batteryHead: {
    width: 25,
    height: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    alignItems: 'center'
  },
  batteryBody: {
    position: 'relative',
    overflow: 'hidden',
    top: 5,
    width: 70,
    height: 120,
    backgroundColor: '#366f6f',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Battery;
