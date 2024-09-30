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

  if (!props.data) return <Empty />;

  return (
    <View>
      <Indicators {...props} />
    </View>
  );
}

export default Display;
