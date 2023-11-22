/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import type { IStore } from '../useStore'

const defaultMapping = {
  8: {
    mode: 'command',
    command: 'smartbar'
  },
  9: {
    mode: 'command',
    command: 'play/pause'
  },
  12: {
    mode: 'command',
    command: 'brightness-up'
  },
  13: {
    mode: 'command',
    command: 'brightness-down'
  },
  16: {
    mode: 'command',
    command: 'padscreen'
  }
}
const storePad = (set: any) => ({
  mapping: {
    0: defaultMapping,
    1: defaultMapping,
    2: defaultMapping,
    3: defaultMapping
  } as any,
  setMapping: (mapping: any): void =>
    set(
      produce((state: IStore) => {
        state.mapping = mapping
      }),
      false,
      'setMapping'
    )
})

export default storePad
