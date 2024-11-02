import { View, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Indicators from './Indicators';
import Cells from './Cells';
import Empty from './Empty';

function Display(props) {
  const { authState } = useAuth();

  const renderMonitor = ({ item }) => {
    switch (item) {
      case 0:
        return <Indicators {...props} />;

        break;

      case 1:
        if (authState.authenticated) return <Cells {...props} />;

        return <Login width={props.width} height={props.height} />;

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
