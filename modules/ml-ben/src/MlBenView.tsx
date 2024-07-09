import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { MlBenViewProps } from './MlBen.types';

const NativeView: React.ComponentType<MlBenViewProps> =
  requireNativeViewManager('MlBen');

export default function MlBenView(props: MlBenViewProps) {
  return <NativeView {...props} />;
}
