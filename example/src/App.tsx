import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Tooltip } from 'react-native-good-tooltip';

export default function App() {
  const data = [
    'In FlatList',
    'zIndex must be specified using',
    'CellRendererComponent.',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
        }}
      >
        <Tooltip
          isVisible={true}
          text="This is a tooltip"
          placement={'bottom'}
          anchor={'left'}
          requiredConfirmation
        >
          <View style={[styles.box, { backgroundColor: 'red' }]} />
        </Tooltip>

        <Tooltip
          isVisible={true}
          text="This is a tooltip"
          placement={'bottom'}
          styles={{ color: 'black' }}
        >
          <View style={[styles.box, { backgroundColor: 'green' }]} />
        </Tooltip>

        <Tooltip
          isVisible={true}
          text="This is a tooltip"
          placement={'bottom'}
          anchor={'right'}
          requiredConfirmation
        >
          <View style={[styles.box, { backgroundColor: 'blue' }]} />
        </Tooltip>
      </View>

      <View
        style={{
          backgroundColor: 'yellow',
          opacity: 0.9,
          paddingTop: 40,
          flexDirection: 'row',
          zIndex: 0,
        }}
      >
        <View
          style={[{ backgroundColor: 'red', flexShrink: 1 }, styles.message]}
        >
          <Text style={{ flexShrink: 1, flexGrow: 1 }}>
            This Tooltip component does not use modal, so you must specify
            z-Index. Especially if the placement is bottom, you need to be
            especially careful.
          </Text>
        </View>
        <View
          style={[{ backgroundColor: 'blue', flexShrink: 1 }, styles.message]}
        >
          <Text style={{ flexShrink: 1, flexGrow: 1 }}>
            This Tooltip component does not use modal, so you must specify
            z-Index. Especially if the placement is bottom, you need to be
            especially careful.
          </Text>
        </View>
      </View>

      {/* Body*/}
      <FlatList
        data={data}
        // style={{ flexGrow: 1 }}
        CellRendererComponent={({ index, style, ...props }) => {
          return (
            <View
              style={[
                style,
                {
                  zIndex: data.length - index,
                },
              ]}
              {...props}
            />
          );
        }}
        renderItem={({ item, index }) => (
          <Tooltip
            isVisible={true}
            placement={'bottom'}
            anchor={(() => {
              if (index % 3 === 0) return 'right';
              if (index % 2 === 0) return 'center';

              return 'left';
            })()}
            text={'List Item Tooltip ' + index}
          >
            <View
              style={{
                paddingVertical: 15,
                backgroundColor: 'blue',
                opacity: 0.4,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ color: 'white' }}>{`${item}`}</Text>
            </View>
          </Tooltip>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: '#8851bc',
              height: 500,
            }}
          >
            <Tooltip
              placement={'top'}
              anchor={'right'}
              text={'Top RIght'}
              isVisible={true}
              requiredConfirmation
            >
              <View style={{ height: 50, backgroundColor: 'red', zIndex: 0 }}>
                <Text>
                  There may be situations where you need to add the overflow:
                  'visible' style.
                </Text>
              </View>
            </Tooltip>

            <View style={{ zIndex: 0 }}>
              <Tooltip
                isVisible={true}
                text="Left Tooltip"
                placement={'left'}
                anchor={'top'}
                requiredConfirmation
              >
                <View style={[styles.box, { backgroundColor: 'red' }]} />
              </Tooltip>
              <Tooltip
                isVisible={true}
                text="Center Tooltip"
                placement={'right'}
                anchor={'center'}
              >
                <View style={[styles.box, { backgroundColor: 'green' }]} />
              </Tooltip>
              <Tooltip
                isVisible={true}
                text="Center Tooltip"
                placement={'left'}
                anchor={'bottom'}
              >
                <View style={[styles.box, { backgroundColor: 'blue' }]} />
              </Tooltip>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  box: {
    width: 50,
    height: 50,
  },
  message: {
    padding: 8,
  },
});
