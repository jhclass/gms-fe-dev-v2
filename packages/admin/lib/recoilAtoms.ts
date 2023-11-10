import { atom } from 'recoil'

export const headerUserMenuState = atom<boolean>({
  key: 'headerUserMenuState',
  default: false,
})