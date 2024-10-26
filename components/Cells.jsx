import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Cell from './Cell';

function Cells({ data, disconnect, width, height }) {
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
          height: height / 1.3,
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
    </View>
  );
}

export default Cells;
