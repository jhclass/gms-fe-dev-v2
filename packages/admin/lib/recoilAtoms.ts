import { atom } from 'recoil'

// screen
export const isScreenState = atom<boolean>({
  key: 'isScreenState',
  default: false,
})

// GNB
export const navOpenState = atom<boolean>({
  key: 'navOpenState',
  default: true,
})

export const categoryMenuState = atom<{}>({
  key: 'categoryMenuState',
  default: {
    상담관리: true,
    회계관리: true,
    통계: true,
  },
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

export const userGraderState = atom<number>({
  key: 'userGraderState',
  default: 99,
})

//grade
export const gradeState = atom({
  key: 'gradeState',
  default: {
    dev: 0,
    master: 1,
    general: 10,
    guest: 99,
  },
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
      name: '방문완료',
      color: '#7dce00',
    },
    40: {
      name: '등록예정',
      color: '#0eacab',
    },
    50: {
      name: '미납고객',
      color: '#0070ad',
    },
    60: {
      name: '등록완료',
      color: '#043999',
    },
    110: {
      name: '오류/거부',
      color: '#cdcdcd',
    },
    999: {
      name: '미처리',
      color: '#FF5900',
    },
    // 60,110 고정
    //   color: '#ff8d4a',
    //   color: '#c9ab00',
    //   color: '#7dce00',
    //   color: '#0eacab',
    //   color: '#0070ad',
    //   color: '#043999',
    //   color: '#7240f7',
    //   color: '#7a0075',
    //   color: '#be058e',
    //   color: '#f85294',
  },
})

export const studentProgressStatusState = atom({
  key: 'studentProgressStatus',
  default: {
    0: {
      name: '신규',
      color: '#c40403',
    },
    10: {
      name: '미배정',
      color: '#FF5900',
    },
    20: {
      name: '배정완료',
      color: '#7dce00',
    },
    30: {
      name: '이수자',
      color: '#0eacab',
    },
    40: {
      name: '중도포기',
      color: '#7a0075',
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
    7: 'EMS',
  },
})

export const subStatusState = atom({
  key: 'subStatus',
  default: { 0: '없음', 1: '일반', 2: '근로자', 3: '실업자', 4: '국가기간' },
})

export const ReceiptState = atom({
  key: 'Receipt',
  default: {
    0: '자체영수증',
    1: '현금영수증',
    2: '이니시스',
    3: '계산서',
    4: 'LGU+',
  },
})

export const cardNameState = atom({
  key: 'cardName',
  default: {
    0: '카드사 선택',
    1: '온라인입금',
    2: '신한카드',
    3: '비씨카드',
    4: '현대카드',
    5: '롯데카드',
    6: '외환카드',
    7: '삼성카드',
    8: 'KB카드',
    9: 'NH카드',
    10: '하나카드',
    11: '광주카드',
    12: '전북카드',
    13: '우리카드',
    14: '국민엘지유플러스',
    15: '신한엘지유플러스',
    16: '삼성엘지유플러스',
    17: '현대엘지유플러스',
    18: '롯데엘지유플러스',
    19: '외환엘지유플러스',
    20: '비씨엘지유플러스',
    21: '엘지유플러스계좌이체',
    22: '카카오페이',
    23: '페이나우',
    24: 'NH엘지유플러스',
    25: '하나엘지유플러스',
    26: '우리엘지유플러스',
  },
})

export const bankNameState = atom({
  key: 'bankName',
  default: {
    0: '은행 선택',
    1: '직접납부',
    2: '신한은행',
    3: 'KB은행',
    4: '농협',
    5: '제일은행',
    6: '하나은행',
    7: '광주은행',
    8: '기업은행',
    9: '우리은행',
    10: '카카오뱅크',
  },
})

//filter
export const consultFilterActiveState = atom<boolean>({
  key: 'consultFilterActive',
  default: false,
})
export const consultPageState = atom<number>({
  key: 'consultPage',
  default: 1,
})
export const consultFilterState = atom<boolean>({
  key: 'consultFilter',
  default: false,
})
export const consultSearchState = atom({
  key: 'consultSearch',
  default: {} as {
    receiptDiv: string
    subDiv: string
    pic: string
    createdAt: []
    stVisit: []
    stName: string
    progress: number
    phoneNum1: string
    adviceType: []
  },
})
export const subjectFilterActiveState = atom<boolean>({
  key: 'subjectFilterActive',
  default: false,
})
export const subjectPageState = atom<number>({
  key: 'subjectPage',
  default: 1,
})
export const subjectFilterState = atom<boolean>({
  key: 'subjectFilter',
  default: false,
})
export const subjectSearchState = atom({
  key: 'subjectSearch',
  default: {} as {
    subjectName: string
    subDiv: string
    exposure: boolean
  },
})

export const studentFilterActiveState = atom<boolean>({
  key: 'subjectFilterActive',
  default: false,
})
export const studentPageState = atom<number>({
  key: 'studentPage',
  default: 1,
})
export const studentFilterState = atom<boolean>({
  key: 'studentFilter',
  default: false,
})

export const studentSearchState = atom({
  key: 'studentSearch',
  default: {} as {
    studentName: string
    phoneNum: string
    birthday: string
    createdAt: string
  },
})
export const paymentFilterActiveState = atom<boolean>({
  key: 'paymentFilterActive',
  default: true,
})
export const paymentPageState = atom<number>({
  key: 'paymentPage',
  default: 1,
})
export const paymentFilterState = atom<boolean>({
  key: 'paymentFilter',
  default: false,
})
export const paymentSearchState = atom({
  key: 'paymentSearch',
  default: {} as {
    createdAt: []
    stName: string
  },
})
export const refundFilterActiveState = atom<boolean>({
  key: 'refundFilterActive',
  default: true,
})
export const refundPageState = atom<number>({
  key: 'refundPage',
  default: 1,
})
export const refundFilterState = atom<boolean>({
  key: 'refundFilter',
  default: false,
})
export const refundSearchState = atom({
  key: 'refundSearch',
  default: {} as {
    createdAt: []
    stName: string
  },
})
export const reqRefundFilterActiveState = atom<boolean>({
  key: 'reqRefundFilterActive',
  default: true,
})
export const reqRefundPageState = atom<number>({
  key: 'reqRefundPage',
  default: 1,
})
export const reqRefundFilterState = atom<boolean>({
  key: 'reqRefundFilter',
  default: false,
})
export const reqRefundSearchState = atom({
  key: 'reqRefundSearch',
  default: {} as {
    createdAt: []
    stName: string
  },
})

export const parformanceFilterActiveState = atom<boolean>({
  key: 'parformanceFilterActive',
  default: false,
})
export const parformanceFilterState = atom<boolean>({
  key: 'parformanceFilter',
  default: false,
})
export const parformanceSearchState = atom({
  key: 'parformanceSearch',
  default: {} as {
    period: [string]
    processingManagerId: [number]
  },
})
export const recruitmentFilterActiveState = atom<boolean>({
  key: 'recruitmentFilterActive',
  default: false,
})
export const recruitmentPageState = atom<number>({
  key: 'recruitmentPage',
  default: 1,
})
export const recruitmentFilterState = atom<boolean>({
  key: 'recruitmentFilter',
  default: false,
})
export const recruitmentSearchState = atom({
  key: 'recruitmentSearch',
  default: {} as {
    subjectName: string
  },
})

//select
export const selectedPaymentState = atom({
  key: 'selectedPayment',
  default: null,
})
export const selectedPaymentDetailState = atom({
  key: 'selectedPaymentDetail',
  default: null,
})
