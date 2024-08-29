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
      <video src="https://github.com/user-attachments/assets/ba8f7cec-8361-4e3d-b24a-88b23f258d18" width="300" height="600" />
    </td>
  </tr>
</table>

## Props


## Props
| Prop                   | Type                                                                                                                                                                                       | Default                                | Description                                                                                   |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|-----------------------------------------------------------------------------------------------|
| `visible`              | `boolean`                                                                                                                                                                                  | `undefined`                            | Whether the tooltip is visible.                                                               |
| `rerenderKey`          | `any`                                                                                                                                                                                      | `undefined`                            | Key to force re-rendering of the tooltip.                                                     |
| `placement`            | `'top' \| 'bottom' \| 'left' \| 'right'`                                                                                                                                                   | **required**                           | The position of the tooltip relative to the anchor.                                           |
| `anchor`               | `'center' \| 'left' \| 'right' \| 'top' \| 'bottom'`                                                                                                                                       | `'center'`                             | The alignment of the tooltip relative to the anchor.                                          |
| `offset`               | `{ position?: { x?: number, y?: number }, arrow?: { x?: number, y?: number } }`                                                                                                            | `undefined`                            | The offset for the tooltip and arrow position.                                                |
| `arrowElement`         | `React.ReactElement`                                                                                                                                                                       | `undefined`                            | Custom arrow element.                                                                         |
| `styles`               | `{color?: ColorValue \| 'primary', containerStyle?: ViewStyle, tooltipStyle?: ViewStyle, arrowSize?: { width?: number, height?: number }, closeSize?: { width?: number, height?: number} }` | `undefined` | Custom styles for the tooltip. |
| `text`                 | `string \| React.ReactElement`                                                                                                                                                             | **required**                           | The content of the tooltip.                                                                   |
| `children`             | `React.ReactElement`                                                                                                                                                                       | `undefined`                            | The element to which the tooltip is anchored.                                                 |
| `onPress`              | `() => void`                                                                                                                                                                               | `undefined`                            | Function to call when the tooltip is pressed.                                                 |
| `onVisibleChange`      | `(isVisible: boolean) => void`                                                                                                                                                             | `undefined`                            | Function to call when the visibility of the tooltip changes.                                  |
| `delayShowTime`        | `number`                                                                                                                                                                                   | `0`                                    | The delay time before showing the tooltip.                                                    |
| `autoHideTime`         | `number`                                                                                                                                                                                   | `5000`                                 | The time after which the tooltip will automatically hide.                                     |
| `disableAutoHide`      | `boolean`                                                                                                                                                                                  | `false`                                | Whether to disable the auto-hide feature.                                                     |
| `disablePressToClose`  | `boolean`                                                                                                                                                                                  | `false`                                | Whether to disable the press-to-close feature.                                                |
| `numberOfLines`        | `number`                                                                                                                                                                | `2`                                    | The number of lines to display in the tooltip text.                                           |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
