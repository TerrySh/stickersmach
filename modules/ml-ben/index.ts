import {EventEmitter, Subscription} from 'expo-modules-core';
import MlBenModule from './src/MlBenModule';

const emitter = new EventEmitter(MlBenModule);

export type Theme = 'light' | 'dark' | 'system';

export type ThemeChangedEvent = {
  theme: Theme;
};

export function addThemeListener(listener: (event: ThemeChangedEvent) => void) : Subscription {
  return emitter.addListener<ThemeChangedEvent>('onChangeTheme', listener);
}

export function getTheme(): Theme {
  return MlBenModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return MlBenModule.setTheme(theme);
}