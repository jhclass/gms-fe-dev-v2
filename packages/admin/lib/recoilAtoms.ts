import { atom } from 'recoil'

export const headerUserMenuState = atom<boolean>({
  key: 'headerUserMenuState',
  default: false,
})

export const navOpenState = atom<boolean>({
  key: 'navOpenState',
  default: true,
})

export const activeCategoryState = atom<number>({
  key: 'activeCategoryState',
  default: 0,
});