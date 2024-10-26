import { useRef } from 'react';
import {
  View,
  FlatList,
  Animated,
  useWindowDimensions
} from 'react-native';
import Indicators from './Indicators';
import Cells from './Cells';
import Empty from './Empty';

function Display(props) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const width = useWindowDimensions().width;

  const renderMonitor = ({ item }) => {
    switch (item) {
      case 0:
        return <Indicators {...props} />;

        break;

      case 1:
        return <Cells {...props} />;

        break;

      case 2:
        break;
    }
  };

  if (!props.data) return <Empty />;

  return (
    <View>
      <FlatList
        data={[0, 1, 2]}
        renderItem={renderMonitor}
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default Display;
