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
export const loginIdFocuseState = atom<boolean>({
  key: 'loginIdFocuseState',
  default: false,
})

export const loginPasswordFocuseState = atom<boolean>({
  key: 'loginPasswordFocuseState',
  default: false,
})

//Button
export const ripplesState = atom({
  key: 'ripplesState',
  default: [] as { id: number; size: number; x: number; y: number }[],
})

export const progressStatusState = atom({
  key: 'progressStatus',
  default: {
    0: '접수대기',
    10: '상담예정',
    20: '방문예정',
    30: '상담완료',
    40: '등록예정',
    50: '등록완료',
    60: '재전화요망',
    70: '부재중',
    80: '내용확인',
    90: '가배정',
    100: '수강생',
    110: '오류/거부',
  },
})
