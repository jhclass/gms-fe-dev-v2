import { atom } from 'recoil'

// screen
export const isScreenState = atom<boolean>({
  key: 'isScreenState',
  default: false,
})

// header
export const categoryMenuState = atom<boolean>({
  key: 'categoryMenuState',
  default: true,
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
      name: '가망고객',
      color: '#ff8d4a',
    },
    20: {
      name: '방문예정',
      color: '#c9ab00',
    },
    30: {
      name: '등록예정',
      color: '#7dce00',
    },
    40: {
      name: '미납고객',
      color: '#0eacab',
    },
    50: {
      name: '등록완료',
      color: '#0070ad',
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
    3: '내사',
    4: 'HRD',
    5: '카카오톡',
    6: '플레이스',
  },
})

export const subStatusState = atom({
  key: 'subStatus',
  default: { 0: '없음', 1: '일반', 2: '근로자', 3: '실업자', 4: '국가기간' },
})
