import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Tooltip from 'react-native-good-tooltip';
import { useState } from 'react';

export default function App() {
  // Example - TextInput
  const [inputText, setInputText] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('Hello');
  const [isFocused, setIsFocused] = useState(false);

  // Example - ScrollView and FlatList
  const [inputTextInScrollVIew, setInputTextInScrollVIew] = useState('');

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

      <Tooltip
        placement={'bottom'}
        anchor={'left'}
        text={tooltipMessage}
        visible={isFocused}
        disableAutoHide
        styles={{
          color: tooltipMessage === 'Correct!' ? 'blue' : undefined,
        }}
      >
        <TextInput
          value={inputText}
          placeholder={'Input secret password'}
          placeholderTextColor={'#6cbd67'}
          onChangeText={(text) => {
            setInputText(text);
            if (text.toLowerCase() === 'world') {
              setTooltipMessage('Correct!');
              setTimeout(() => {
                setIsFocused(false);
              }, 1500);
            }
          }}
          style={{ padding: 16, backgroundColor: 'gray', color: 'white' }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </Tooltip>

      <View style={{ height: 100 }} />

      <FlatList
        data={[0]}
        style={{ backgroundColor: 'blue', zIndex: 100, overflow: 'visible' }}
        renderItem={() => (
          <Tooltip
            placement={'top'}
            text={'overflowed ui in FlatList can not touch'}
            disableAutoHide
            numberOfLines={-1}
          >
            <Tooltip placement={'bottom'} text={'In FlatList'} disableAutoHide>
              <TextInput
                placeholder={'Input text'}
                value={inputTextInScrollVIew}
                style={{ padding: 16, backgroundColor: 'gray' }}
                onChangeText={setInputTextInScrollVIew}
              />
            </Tooltip>
          </Tooltip>
        )}
      />

      <View style={{ height: 50, zIndex: 200 }} />

      <ScrollView
        style={{
          backgroundColor: 'green',
          overflow: 'visible',
          zIndex: 300,
        }}
      >
        <Tooltip
          placement={'top'}
          text={'overflowed ui in ScrollView can not touch'}
          disableAutoHide
          numberOfLines={-1}
        >
          <Tooltip placement={'bottom'} text={'In ScrollView'} disableAutoHide>
            <TextInput
              placeholder={'Input text'}
              value={inputTextInScrollVIew}
              style={{ padding: 16, backgroundColor: 'gray' }}
              onChangeText={setInputTextInScrollVIew}
            />
          </Tooltip>
        </Tooltip>
      </ScrollView>
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
