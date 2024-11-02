import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Battery from './Battery';

function Indicators({
  data,
  deviceCode,
  deviceNumber,
  factoryVoltage,
  factoryCapacity,
  disconnect,
  width,
  height
}) {
  return (
    <View
      style={{
        width,
        height,
        alignItems: 'center'
      }}
    >
      <View
        style={{
          width: 300,
          height: 40
        }}
      >
        <Text
          style={{
            width: 300,
            height: 30,
            fontWeight: '700',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateY: -20 }, { translateX: -145 }]
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#4ec0c1'
            }}
          >
            АКБ&nbsp;&nbsp;&nbsp;
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#4ec0c1'
            }}
          >
            №
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#4ec0c1'
            }}
          >
            {deviceNumber}&nbsp;&nbsp;&nbsp;
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#366f6f'
            }}
          >
            {deviceCode}
          </Text>
        </Text>
      </View>
      <View
        style={{
          width: 320,
          height: 190,
          marginTop: 12
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0c1716',
            borderRadius: 10,
            position: 'absolute'
          }}
        />
        <Text
          style={{
            width: 200,
            height: 100,
            fontWeight: '700',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateY: -75 }, { translateX: -140 }],
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: '700',
              color: '#30f5ef'
            }}
          >
            {data.capacity}
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '700',
              color: '#30f5ef'
            }}
          >
            %
          </Text>
        </Text>
        <View
          style={{
            position: 'absolute',
            top: 30,
            right: 9
          }}
        >
          <Battery level={data.capacity} />
        </View>
        <Text
          style={{
            height: 60,
            fontSize: 48,
            fontWeight: '700',
            opacity: 0.6,
            color: '#4ec0c1',
            position: 'absolute',
            top: '60%',
            left: 25
          }}
        >
          {factoryCapacity} Ач
        </Text>
      </View>
      <View
        style={{
          width: 320,
          height: 180,
          marginTop: 15
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0c1716',
            borderRadius: 10,
            position: 'absolute'
          }}
        />
        <Text
          style={{
            width: 200,
            fontWeight: '700',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateY: -75 }, { translateX: -135 }]
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: '700',
              color: '#30f5ef'
            }}
          >
            {data.totalVolt}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: '#30f5ef'
            }}
          >
            В
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 120,
            fontWeight: '700',
            color: '#366f6f',
            position: 'absolute',
            top: 10,
            right: 25
          }}
        >
          U
        </Text>
        <View
          style={{
            width: '16%',
            height: '30%',
            position: 'absolute',
            top: '60%',
            left: 26
          }}
        >
          <Text
            style={{
              height: 15,
              fontSize: 12,
              fontWeight: '500',
              opacity: 0.6,
              color: '#4ec0c1',
              marginTop: 5,
              marginLeft: 10
            }}
          >
            Мин
          </Text>
          <Text
            style={{

              fontSize: 16,
              fontWeight: '500',
              color: '#30f5ef',
              marginTop: 2,
              marginLeft: 10
            }}
          >
            {data.voltMin}
          </Text>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#337c7c',
              borderStyle: 'solid',
              position: 'absolute'
            }}
          />
        </View>
        <View
          style={{
            width: '16%',
            height: '30%',
            position: 'absolute',
            top: '60%',
            left: '26%'
          }}
        >
          <Text
            style={{
              height: 15,
              fontSize: 12,
              fontWeight: '500',
              opacity: 0.6,
              color: '#4ec0c1',
              marginTop: 5,
              marginLeft: 10
            }}
          >
            Макс
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#30f5ef',
              marginTop: 2,
              marginLeft: 10
            }}
          >
            {data.voltMax}
          </Text>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#337c7c',
              borderStyle: 'solid',
              position: 'absolute'
            }}
          />
        </View>
        <View
          style={{
            width: '16%',
            height: '30%',
            position: 'absolute',
            top: '60%',
            left: '44%'
          }}
        >
          <Text
            style={{
              height: 15,
              fontSize: 12,
              fontWeight: '500',
              opacity: 0.6,
              color: '#4ec0c1',
              marginTop: 5,
              marginLeft: 10
            }}
          >
            Разн
          </Text>
          <Text
            style={{
              height: 20,
              fontSize: 16,
              fontWeight: '500',
              color: '#30f5ef',
              marginTop: 2,
              marginLeft: 10
            }}
          >
            {data.voltDiff}
          </Text>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#337c7c',
              borderStyle: 'solid',
              position: 'absolute'
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: 320,
          height: 160,
          marginTop: 8
        }}
      >
        <View
          style={{
            width: 180,
            height: 80,
            position: 'absolute',
            left: 140
          }}
        >
          <Text
            style={{
              fontSize: 70,
              fontWeight: '700',
              color: '#366f6f',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 1,
              transform: [{ translateY: -50 }, { translateX: -75 }]
            }}
          >
            t
          </Text>
          <View
            style={{
              width: '100%',
              height: '85%',
              backgroundColor: '#0c1716',
              borderRadius: 10,
              position: 'absolute',
              top: '10%'
            }}
          />
          <Text
            style={{
              width: 100,
              height: 45,
              fontWeight: '700',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateY: -25 }, { translateX: -12 }]
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: '700',
                color: '#30f5ef'
              }}
            >
              {data.temp}
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: '#366f6f'
              }}
            >
              °С
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: 130,
            height: 150,
            position: 'absolute',
            top: 7
          }}
        >
          <Text
            style={{
              zIndex: 1,
              marginTop: 75,
              marginLeft: 20
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: '700',
                color: '#30f5ef'
              }}
            >
              {data.current}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#30f5ef'
              }}
            >
              А
            </Text>
          </Text>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0c1716',
              borderRadius: 10,
              position: 'absolute'
            }}
          />
          <Text
            style={{
              fontSize: 60,
              fontWeight: '700',
              color: '#366f6f',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateY: -70 }, { translateX: -40 }]
            }}
          >
            I
          </Text>
        </View>
        <View
          style={{
            width: 180,
            height: 70,
            position: 'absolute',
            top: 85,
            left: 140
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0c1716',
              borderRadius: 10,
              position: 'absolute'
            }}
          />
          <Text
            style={{
              fontSize: 36,
              fontWeight: '700',
              color: '#30f5ef',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateY: -25 }, { translateX: -10 }]
            }}
          >
            {data.cycle}
          </Text>
          <View
            style={{
              width: 36,
              height: 36,
              position: 'absolute',
              top: 20,
              left: 12
            }}
          >
            <ImageBackground
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute'
              }}
              source={require('../assets/images/cycle.png')}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: 320,
          height: 60,
          marginTop: 15
        }}
      >
        <TouchableOpacity
          style={{
            height: 30,
            zIndex: 1
          }}
          onPress={disconnect}
        >
          <Text
            style={{
              height: 30,
              fontSize: 24,
              fontWeight: '500',
              textAlign: 'center',
              color: '#4ec0c1',
              marginTop: 13
            }}>
            Отключить
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
  );
}

export default Indicators;
