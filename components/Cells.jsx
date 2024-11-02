import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Cell from './Cell';

function Cells({ data, disconnect, width, height }) {
  const { authState, onLogout } = useAuth();

  const renderBattery = ({ item }) => <Cell id={item.id} voltage={item.voltage} />;

  return (
    <View style={{
      width,
      height,
      alignItems: 'center'
    }}>
      <Text
        style={{
          width: 250,
          height: 60,
          fontSize: 24,
          fontWeight: '700',
          color: '#4ec0c1',
          textAlign: 'center'
        }}
      >
        Состояние отдельных ячеек
      </Text>
      <View
        style={{
          width: 300,
          height: height / 1.5,
          backgroundColor: '#0d1012',
          borderRadius: 10,
          marginVertical: 20,
          paddingVertical: 20
        }}
      >
        <View style={{
          alignItems: 'center'
        }}>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            numColumns={6}
            data={data.singleData}
            keyExtractor={({ id }) => id.toString()}
            renderItem={renderBattery}
            scrollEnabled={false}
          />
        </View>
      </View>
      {authState.authenticated && (
        <View>
          <View
            style={{
              width: 320,
              height: 60,
              marginTop: 15
            }}
          >
            <TouchableOpacity
              style={{
                zIndex: 1
              }}
              onPress={onLogout}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: '#4ec0c1',
                  marginTop: 12
                }}
              >
                Выйти
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0c1716',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#4ec0c1',
                borderStyle: 'solid',
                position: 'absolute'
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default Cells;
