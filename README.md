# React Native Good Tooltip

Tooltips do not interrupt the user's flow. I'm not positive about the flow of using the app after touching the tooltip to close it.
So this component doesn't use Modal.

## Installation

```sh
npm install react-native-good-tooltip
```

## Usage

**⚠️Warning⚠️️**
This component will need to be used with styles (z-Index and Overflow).
You will immediately see the need for zIndex if you use "bottom" placement.
Please refer to the example project and video.

```tsx
import Tooltip from 'react-native-good-tooltip';


// ...

<Tooltip
  isVisible={true}
  text="This is a tooltip"
  placement={'bottom'}
  anchor={'left'}
  requiredConfirmation
>
  {/* your component */}
</Tooltip>
```

## Video
<table>
  <tr>
    <td>
      <video src="https://github.com/user-attachments/assets/b7c69e2f-ef99-476b-bca7-bd9bed3c65bf" width="300" height="600" />
    </td>
  </tr>
</table>

## Props


## Props
| Prop                   | Type                                                                 | Default                                | Description                                                                                   |
|------------------------|----------------------------------------------------------------------|----------------------------------------|-----------------------------------------------------------------------------------------------|
| `placement`            | `'top' \| 'bottom' \| 'left' \| 'right'`                             | **required**                           | The position of the tooltip relative to the anchor.                                           |
| `anchor`               | `'center' \| 'left' \| 'right' \| 'top' \| 'bottom'`                 | `'center'`                             | The alignment of the tooltip relative to the anchor.                                          |
| `text`                 | `string \| React.ReactElement`                                       | **required**                           | The content of the tooltip.                                                                   |
| `isVisible`            | `boolean`                                                            | **required**                           | Whether the tooltip is visible.                                                               |
| `offset`               | `{ position?: { x?: number, y?: number }, arrow?: { x?: number, y?: number } }` | `undefined`                            | The offset for the tooltip and arrow position.                                                |
| `arrowElement`         | `React.ReactElement`                                                 | `undefined`                            | Custom arrow element.                                                                         |
| `styles`               | `{color?: ColorValue,containerStyle?: ViewStyle,tooltipStyle?: ViewStyle,arrowSize?: { width?: number, height?: number },closeSize?: { width?: number, height?: number} }` | `undefined` | Custom styles for the tooltip. |
| `children`             | `React.ReactElement`                                                 | `undefined`                            | The element to which the tooltip is anchored.                                                 |
| `onPress`              | `() => void`                                                         | `undefined`                            | Function to call when the tooltip is pressed.                                                 |
| `onVisibleChange`      | `(isVisible: boolean) => void`                                       | `undefined`                            | Function to call when the visibility of the tooltip changes.                                  |
| `disableAutoHide`      | `boolean`                                                            | `false`                                | Whether to disable the auto-hide feature.                                                     |
| `delayShowTime`        | `number`                                                             | `0`                                    | The delay time before showing the tooltip.                                                    |
| `autoHideTime`         | `number`                                                             | `5000`                                 | The time after which the tooltip will automatically hide.                                     |
| `requiredConfirmation` | `boolean`                                                            | `false`                                 | Whether the tooltip requires confirmation to hide.                                            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
