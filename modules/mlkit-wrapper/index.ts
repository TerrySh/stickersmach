import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to MlkitWrapper.web.ts
// and on native platforms to MlkitWrapper.ts
import MlkitWrapperModule from './src/MlkitWrapperModule';
import MlkitWrapperView from './src/MlkitWrapperView';
import { ChangeEventPayload, MlkitWrapperViewProps } from './src/MlkitWrapper.types';

// Get the native constant value.
export const PI = MlkitWrapperModule.PI;

export function hello(): string {
  return MlkitWrapperModule.hello();
}

export async function setValueAsync(value: string) {
  return await MlkitWrapperModule.setValueAsync(value);
}

const emitter = new EventEmitter(MlkitWrapperModule ?? NativeModulesProxy.MlkitWrapper);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MlkitWrapperView, MlkitWrapperViewProps, ChangeEventPayload };
