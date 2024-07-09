import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to MlBen.web.ts
// and on native platforms to MlBen.ts
import MlBenModule from './src/MlBenModule';
import MlBenView from './src/MlBenView';
import { ChangeEventPayload, MlBenViewProps } from './src/MlBen.types';

// Get the native constant value.
export const PI = MlBenModule.PI;

export function hello(): string {
  return MlBenModule.hello();
}

export async function setValueAsync(value: string) {
  return await MlBenModule.setValueAsync(value);
}

const emitter = new EventEmitter(MlBenModule ?? NativeModulesProxy.MlBen);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MlBenView, MlBenViewProps, ChangeEventPayload };
