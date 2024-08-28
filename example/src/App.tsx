import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Tooltip from 'react-native-good-tooltip';
import { useState } from 'react';

export default function App() {
  const [inputText, setInputText] = useState('');

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
          text="This is a tooltip"
          placement={'bottom'}
          anchor={'left'}
          onPress={() => {}}
        >
          <View style={[styles.box, { backgroundColor: 'red' }]} />
        </Tooltip>

        <Tooltip
          text="This is a tooltip"
          placement={'bottom'}
          styles={{ color: 'black' }}
        >
          <View style={[styles.box, { backgroundColor: 'green' }]} />
        </Tooltip>

        <Tooltip text="This is a tooltip" placement={'bottom'} anchor={'right'}>
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

      <Tooltip placement={'bottom'} text={'Input Text'}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder={'Input text'}
          style={{ padding: 16, backgroundColor: 'gray' }}
        />
      </Tooltip>

      <FlatList
        data={[1, 2, 3]}
        renderItem={() => {
          return (
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={'Input text'}
              style={{ padding: 16, backgroundColor: 'gray' }}
            />
          );
        }}
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
