import { View, Text, ActivityIndicator } from 'react-native';

function Empty({ width, permissions }) {
  return (
    <View style={{
      flex: 1,
      width,
      height: 700,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {permissions ?
        <Text style={{
          color: '#53bfbd',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginHorizontal: 20
        }}>
          Предоставьте приложению необходимые разрешения
        </Text>
        : <ActivityIndicator size={300} color='#53bfbd' />
      }
    </View>
  );
}

export default Empty;
