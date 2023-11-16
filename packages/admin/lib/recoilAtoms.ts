import { atom } from 'recoil'

// screen
export const isScreenState = atom<boolean>({
  key: 'isScreenState',
  default: false,
})

// header
export const headerUserMenuState = atom<boolean>({
  key: 'headerUserMenuState',
  default: false,
})

// nav
export const navOpenState = atom<boolean>({
  key: 'navOpenState',
  default: true,
})

export const activeCategoryState = atom<number>({
  key: 'activeCategoryState',
  default: 0,
})

//Login
export const loginIdFocuseState = atom({
  key: 'loginIdFocuseState',
  default: false,
})

export const loginPasswordFocuseState = atom({
  key: 'loginPasswordFocuseState',
  default: false,
})

//Button
export const ripplesState = atom({
  key: 'ripplesState',
  default: [] as { id: number; size: number; x: number; y: number }[],
})
