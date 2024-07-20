import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

function Empty({ permissions }) {
  return (
    <View style={styles.container}>
      {permissions ?
        <Text style={styles.title}>Предоставьте приложению необходимые разрешения</Text> :
        <ActivityIndicator size={300} color='#53bfbd' />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#53bfbd',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default Empty;
