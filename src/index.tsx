import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { createArrowShape, getAnchorPoint } from './functions';

// DEFAULT VALUES
const SIDE_ARROW_INSET = 12;
const CLOSE_ICON_SIZE = { width: 16, height: 16 };
const ARROW_SIZE = { width: 10, height: 6 };
const TOOLTIP_STYLE = {
  width: Dimensions.get('window').width * 0.3,
  paddingVertical: 8,
  paddingHorizontal: 12,
};

interface ToolTipProps {
  visible?: boolean;
  rerenderKey?: any;
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
  arrowElement?: React.ReactElement;
  styles?: {
    color?: ColorValue | 'primary';
    containerStyle?: ViewStyle;
    tooltipStyle?: ViewStyle;
    arrowSize?: {
      width?: number;
      height?: number;
    };
    closeSize?: {
      width?: number;
      height?: number;
    };
  };
  text: string | React.ReactElement;
  children?: React.ReactElement;
  onPress?: () => void;
  onVisibleChange?: (isVisible: boolean) => void;
  delayShowTime?: number;
  autoHideTime?: number;
  disableAutoHide?: boolean;
  disablePressToClose?: boolean;
}

const Tooltip = ({
  visible,
  anchor = 'center',
  styles = {
    tooltipStyle: TOOLTIP_STYLE,
    arrowSize: ARROW_SIZE,
    closeSize: CLOSE_ICON_SIZE,
  },
  text,
  children,
  placement,
  onPress,
  offset,
  arrowElement,
  onVisibleChange,
  delayShowTime = 0,
  autoHideTime = 5000,
  disableAutoHide,
  disablePressToClose = true,
}: ToolTipProps) => {
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: Platform.OS === 'android' && placement === 'right' ? -4 : 0,
  });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const isVerticalPlacement = placement === 'top' || placement === 'bottom';
  const tooltipColor = (() => {
    if (styles?.color) return styles?.color;

    return '#3Eb489';
  })();
  const arrowStyle = {
    ...createArrowShape(
      styles?.arrowSize?.width || ARROW_SIZE.width,
      styles?.arrowSize?.height || ARROW_SIZE.height
    ),
    borderBottomColor: tooltipColor,
  };
  const transformsStyle = (() => {
    const { x, y } = getAnchorPoint(placement, anchor);

    return withAnchorPoint(
      { transform: [{ scale: animatedValue }] },
      { x, y },
      { width: tooltipSize.width, height: tooltipSize.height }
    );
  })();

  const runAnimation = useCallback(
    (isShowAnimation: boolean) => {
      if (isShowAnimation) {
        Animated.spring(animatedValue, {
          toValue: 1,
          speed: 6,
          useNativeDriver: true,
        }).start(() => {
          onVisibleChange && onVisibleChange(true);
        });
      } else {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onVisibleChange && onVisibleChange(false);
        });
      }
    },
    [animatedValue, onVisibleChange]
  );

  // show animation
  useEffect(() => {
    if (visible !== undefined && !visible) {
      return;
    }

    setTimeout(() => {
      runAnimation(true);
    }, delayShowTime);
  }, [delayShowTime, runAnimation, visible]);

  // hide animation
  useEffect(() => {
    if (onPress || disableAutoHide) return;

    setTimeout(() => {
      runAnimation(false);
    }, delayShowTime + autoHideTime);
  }, [autoHideTime, delayShowTime, disableAutoHide, onPress, runAnimation]);

  // hide by props.visible
  useEffect(() => {
    if (visible === false) {
      runAnimation(false);
    }
  }, [runAnimation, visible]);

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
        styles?.containerStyle,
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

  const renderTooltipContent = () => (
    // View Overflow 영역에 있는 Tooltip을 선택하기 위해 TouchableOpacity 사용
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (!disablePressToClose) {
          return;
        }

        runAnimation(false);
        onPress && onPress();
      }}
      style={{
        backgroundColor: tooltipColor,
        borderRadius: 10,
        ...(styles?.tooltipStyle || TOOLTIP_STYLE),
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

        {onPress && (
          <>
            <View style={{ width: 8 }} />
            <Image
              source={require('../assets/close.png')}
              style={{
                width: styles?.closeSize?.width || CLOSE_ICON_SIZE.width,
                height: styles?.closeSize?.height || CLOSE_ICON_SIZE.height,
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
            opacity: animatedValue,
            width: styles?.tooltipStyle?.width,
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

export default Tooltip;
