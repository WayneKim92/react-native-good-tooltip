import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  type ColorValue,
  type LayoutChangeEvent,
  type ViewStyle,
  Image,
} from 'react-native';
import { withAnchorPoint } from 'react-native-anchor-point';
import { getAnchorPoint } from './functions';

const SIDE_ARROW_INSET = 12;
const CLOSE_ICON_SIZE = 16;

interface ToolTipProps {
  placement: 'top' | 'bottom' | 'left' | 'right';
  anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  offset?: {
    position?: {
      x?: number;
      y?: number;
    };
    arrow?: {
      x?: number;
      y?: number;
    };
  };
  arrowSize?: {
    width?: number;
    height?: number;
  };
  closeSize?: {
    width?: number;
    height?: number;
  };
  arrowElement?: React.ReactElement;
  tooltipWidth?: number;
  containerStyle?: ViewStyle;
  color?: ColorValue | string;
  colorType?: 'primary' | 'black';
  text: string | React.ReactElement;
  children?: React.ReactElement;
  isVisible: boolean;
  onPress?: () => void;
  onVisibleChange?: (isVisible: boolean) => void;
  disableAutoHide?: boolean;
  delayShowTime?: number;
  autoHideTime?: number;
  requiredConfirmation?: boolean;
}

const DefaultArrowSize = { width: 10, height: 6 };

export const Tooltip = ({
  isVisible,
  anchor = 'center',
  tooltipWidth = Dimensions.get('window').width * 0.3,
  containerStyle,
  text,
  children,
  placement,
  onPress,
  color,
  colorType = 'primary',
  offset,
  closeSize,
  arrowSize = DefaultArrowSize,
  arrowElement,
  onVisibleChange,
  disableAutoHide = false,
  delayShowTime = 0,
  autoHideTime = 5000,
  requiredConfirmation = false,
}: ToolTipProps) => {
  const [currentIsVisible, setCurrentIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: Platform.OS === 'android' && placement === 'right' ? -4 : 0,
  });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const animatedValue = new Animated.Value(0);

  const isVerticalPlacement = placement === 'top' || placement === 'bottom';
  const tooltipColor = (() => {
    if (color) return color;
    if (colorType === 'black') return 'black';

    return '#3Eb489';
  })();
  const tooltipPadding = {
    paddingVertical: 8,
    paddingHorizontal: 12,
  };
  const arrowStyle = {
    borderLeftWidth: (arrowSize?.width || DefaultArrowSize.width) / 2,
    borderRightWidth: (arrowSize?.width || DefaultArrowSize.width) / 2,
    borderBottomWidth: arrowSize?.height || DefaultArrowSize.height,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: tooltipColor,
  };

  useEffect(() => {
    if (
      autoHideTime > 0 &&
      disableAutoHide === false &&
      requiredConfirmation === false
    ) {
      setTimeout(() => {
        // 기본적으로 5초 뒤 사라짐 처리
        setCurrentIsVisible(false);
      }, autoHideTime);
    }
  }, [autoHideTime, disableAutoHide, requiredConfirmation]);

  useEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(isVisible);
    }
  }, [isVisible, onVisibleChange]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentIsVisible(isVisible);
    }, delayShowTime);
  }, [delayShowTime, isVisible]);

  const handleVerticalTooltipLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (placement === 'top') {
      setTooltipPosition({ top: -height, left: 0 });
    }
    setTooltipSize({
      width,
      height,
    });
  };

  const handleHorizontalTooltipLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    const newLeft = width - 4;
    if (placement === 'left') {
      setTooltipPosition({ top: 0, left: -newLeft });
    }
    setTooltipSize({
      width,
      height,
    });
  };

  const renderVerticalArrow = () => (
    <View
      style={[
        {
          alignItems: ((): ViewStyle['alignItems'] => {
            if (anchor === 'left') return 'flex-start';
            if (anchor === 'right') return 'flex-end';
            return 'center';
          })(),
        },
        containerStyle,
      ]}
    >
      <View
        style={{
          ...arrowStyle,
          left: (() => {
            let x = SIDE_ARROW_INSET + (offset?.arrow?.x || 0);

            if (!isVerticalPlacement) {
              x = offset?.arrow?.x || 0;
            }
            if (anchor === 'center') {
              x = offset?.arrow?.x || 0;
            }
            if (anchor === 'right') {
              x = -x;
            }

            return x;
          })(),
          top: (() => {
            let y = SIDE_ARROW_INSET + (offset?.arrow?.y || 0);

            if (isVerticalPlacement) {
              y = offset?.arrow?.y || 0;
            }
            if (anchor === 'center') {
              y = offset?.arrow?.y || 0;
            }
            if (anchor === 'bottom') {
              y = -y;
            }

            // 은찬: AOS에서 간혈적으로 박스와 화살표 사이에 틈이 보이는 이슈가 있어서 0.1 추가
            return y + (Platform.OS === 'android' ? 0.1 : 0);
          })(),
          transform: (() => {
            if (placement === 'bottom') return [{ rotate: '0deg' }];
            if (placement === 'top') return [{ rotate: '180deg' }];
            if (placement === 'left') return [{ rotate: '90deg' }];
            if (placement === 'right') return [{ rotate: '-90deg' }];
            return undefined;
          })(),
        }}
      >
        {arrowElement === undefined && arrowElement}
      </View>
    </View>
  );

  const renderHorizontalArrow = () => (
    <View
      style={{
        ...arrowStyle,
        left: (() => {
          let left = 0;
          if (placement === 'left') {
            left = -2;
          }
          if (placement === 'right') {
            left = 2;
          }

          // 은찬: AOS에서 간혈적으로 박스와 화살표 사이에 틈이 보이는 이슈가 있어서 0.1 추가
          return left + (Platform.OS === 'android' ? 0.1 : 0);
        })(),
        top: (() => {
          return 0;
        })(),
        transform: (() => {
          if (placement === 'bottom') return [{ rotate: '0deg' }];
          if (placement === 'top') return [{ rotate: '180deg' }];
          if (placement === 'left') return [{ rotate: '90deg' }];
          if (placement === 'right') return [{ rotate: '-90deg' }];
          return undefined;
        })(),
      }}
    >
      {arrowElement === undefined && arrowElement}
    </View>
  );

  const transformsStyle = (() => {
    const { x, y } = getAnchorPoint(placement, anchor);

    if (currentIsVisible) {
      Animated.spring(animatedValue, {
        toValue: 1,
        speed: 6,
        useNativeDriver: true,
      }).start();
    } else {
      animatedValue.setValue(1);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    return withAnchorPoint(
      { transform: [{ scale: animatedValue }] },
      { x, y },
      { width: tooltipSize.width, height: tooltipSize.height }
    );
  })();

  const renderTooltipContent = () => (
    // View Overflow 영역에 있는 Tooltip을 선택하기 위해 TouchableOpacity 사용
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setCurrentIsVisible((prevState) => !prevState);
        onPress && onPress();
      }}
      style={{
        ...tooltipPadding,
        backgroundColor: tooltipColor,
        borderRadius: 10,
      }}
    >
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        pointerEvents={'box-none'}
      >
        {/* content */}
        {typeof text !== 'string' ? (
          text
        ) : (
          <Text
            style={{ flexShrink: 1, color: 'white' }}
            numberOfLines={2}
            children={text}
          />
        )}

        {requiredConfirmation && (
          <>
            <View style={{ width: 8 }} />
            <Image
              source={require('../assets/close.png')}
              style={{
                width: closeSize?.width || CLOSE_ICON_SIZE,
                height: closeSize?.height || CLOSE_ICON_SIZE,
              }}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderVerticalTooltip = () => (
    <View
      style={{
        alignItems: ((): ViewStyle['alignItems'] => {
          if (anchor === 'left') return 'flex-start';
          if (anchor === 'right') return 'flex-end';
          return 'center';
        })(),
        top: tooltipPosition.top + (offset?.position?.y || 0),
        left: tooltipPosition.left + (offset?.position?.x || 0),
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: tooltipWidth,
            opacity: animatedValue,
          },
          transformsStyle,
        ]}
        onLayout={handleVerticalTooltipLayout}
      >
        {placement === 'top' && renderTooltipContent()}
        {renderVerticalArrow()}
        {placement === 'bottom' && renderTooltipContent()}
      </Animated.View>
    </View>
  );
  const renderHorizontalTooltip = () => (
    // 툴팁 & 화살표 정렬 기준 ( top, center, bottom )
    <View
      style={{
        justifyContent: (() => {
          if (anchor === 'top') return 'flex-start';
          if (anchor === 'bottom') return 'flex-end';
          return 'center';
        })(),
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            left: tooltipPosition.left + (offset?.position?.x || 0),
            opacity: animatedValue,
          },
          transformsStyle,
        ]}
        onLayout={handleHorizontalTooltipLayout}
      >
        {placement === 'left' && renderTooltipContent()}
        {renderHorizontalArrow()}
        {placement === 'right' && renderTooltipContent()}
      </Animated.View>
    </View>
  );

  return (
    <View collapsable={false} style={{ zIndex: 500 }}>
      {placement === 'top' && renderVerticalTooltip()}
      {isVerticalPlacement ? (
        children
      ) : (
        <View style={{ flexDirection: 'row' }}>
          {placement === 'left' && renderHorizontalTooltip()}
          {children}
          {placement === 'right' && renderHorizontalTooltip()}
        </View>
      )}
      {placement === 'bottom' && renderVerticalTooltip()}
    </View>
  );
};
