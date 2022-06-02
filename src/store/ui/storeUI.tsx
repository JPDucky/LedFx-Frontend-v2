/* eslint-disable no-param-reassign */
import produce from 'immer';

const storeUI = (set: any) => ({
  darkMode: false,
  setDarkMode: (dark: boolean): void =>
    set(
      produce((state: any) => {
        state.ui.darkMode = dark;
      }),
      false,
      'ui/darkmode'
    ),

  snackbar: {
    isOpen: false,
    messageType: 'error',
    message: 'NO MESSAGE',
  },
  showSnackbar: (messageType: string, message: string): void =>
    set(
      produce((state: any) => {
        state.ui.snackbar = { isOpen: true, message, messageType };
      }),
      false,
      'ui/showSnackbar'
    ),
  clearSnackbar: (): void =>
    set(
      produce((state: any) => {
        state.ui.snackbar.isOpen = false;
      }),
      false,
      'ui/clearSnackbar'
    ),

  bars: {
    leftBar: {
      open: false,
    },
  },
  setLeftBarOpen: (open: boolean): void =>
    set(
      produce((state: any) => {
        state.ui.bars.leftBar.open = open;
      }),
      false,
      'ui/setLeftBarOpen'
    ),

  settingsExpanded: false,
  setSettingsExpanded: (setting: any): void =>
    set(
      produce((state: any) => {
        state.ui.settingsExpanded = setting;
      }),
      false,
      'ui/settingsExpanded'
    ),

  viewMode: 'user',
  setViewMode: (mode: string): void =>
    set(
      produce((state: any) => {
        state.ui.viewMode = mode;
      }),
      false,
      'ui/setViewMode'
    ),

  pixelGraphs: [],
  setPixelGraphs: (virtuals: any): void =>
    set(
      produce((state: any) => {
        state.ui.pixelGraphs = [...virtuals];
      }),
      false,
      'ui/setPixelGraphs'
    ),
});

export default storeUI;
