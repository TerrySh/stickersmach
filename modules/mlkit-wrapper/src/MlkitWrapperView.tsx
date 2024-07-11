import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { MlkitWrapperViewProps } from './MlkitWrapper.types';

const NativeView: React.ComponentType<MlkitWrapperViewProps> =
  requireNativeViewManager('MlkitWrapper');

export default function MlkitWrapperView(props: MlkitWrapperViewProps) {
  return <NativeView {...props} />;
}
