// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<
  SymbolViewProps['name'],
  ComponentProps<typeof MaterialIcons>['name']
>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'gamecontroller.fill': 'games',
  pause: 'pause',
  'heart.fill': 'favorite',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
