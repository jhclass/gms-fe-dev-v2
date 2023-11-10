import { atom } from 'recoil'

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
});


//Login
export const loginIdInputState = atom({
  key: 'loginIdInputState',
  default: {
    isFocused: false,
    hasValue: false,
  },
});

export const loginPasswordInputState = atom({
  key: 'loginPasswordInputState',
  default: {
    isFocused: false,
    hasValue: false,
  },
});


//Button
export const ripplesState = atom({
  key: 'ripplesState',
  default: [] as { id: number; size: number; x: number; y: number }[],
});