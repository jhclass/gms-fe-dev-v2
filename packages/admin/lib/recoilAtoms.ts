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
    0: {
      name: '접수대기',
      color: '#c40403',
    },
    10: {
      name: '상담예정',
      color: '#ff8d4a',
    },
    20: {
      name: '방문예정',
      color: '#c9ab00',
    },
    30: {
      name: '상담완료',
      color: '#7dce00',
    },
    40: {
      name: '등록예정',
      color: '#0eacab',
    },
    50: {
      name: '등록완료',
      color: '#0070ad',
    },
    60: {
      name: '재전화요망',
      color: '#043999',
    },
    70: {
      name: '부재중',
      color: '#7240f7',
    },
    80: {
      name: '내용확인',
      color: '#7a0075',
    },
    90: {
      name: '가배정',
      color: '#be058e',
    },
    100: {
      name: '수강생',
      color: '#f85294',
    },
    110: {
      name: '오류/거부',
      color: '#cdcdcd',
    },
    999: {
      name: '미처리',
      color: '#FF5900',
    },
  },
})

export const receiptStatusState = atom({
  key: 'receiptStatus',
  default: {
    0: '없음',
    1: '온라인',
    2: '전화',
    3: '방문',
  },
})

export const subStatusState = atom({
  key: 'subStatus',
  default: { 0: '없음', 1: 'HRD', 2: '일반' },
})

// Filter
export const studentFilterState = atom({
  key: 'studentFilterState',
  default: {},
})
