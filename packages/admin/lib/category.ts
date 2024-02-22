interface Category {
  id?: number
  href: string
  iconSrc?: string
  name: string
  children: Children[]
  resetItems?: string[]
  exposure: boolean
  isBreadcrumb?: boolean
  isFilter?: boolean
  isWrite?: string
  grade?: string
}

interface Children {
  href: string
  name: string
  exposure: boolean
  isBreadcrumb: boolean
  isFilter: boolean
  isWrite: string
  grade?: string
}

const category: Category[] = [
  {
    id: 0,
    href: '/',
    // iconSrc: 'ico_home',
    iconSrc: 'xi-home-o',
    name: '대시보드',
    exposure: true,
    isBreadcrumb: false,
    isFilter: false,
    isWrite: '',
    children: [],
  },
  {
    id: 1,
    href: '/consult',
    // iconSrc: 'ico_consult',
    iconSrc: 'xi-forum-o',
    name: '상담관리',
    resetItems: [
      'resetConsultPage',
      'resetConsultFilterActive',
      'resetConsultFilterSearch',
      'resetConsultFilter',
    ],
    exposure: true,
    children: [
      {
        href: '/',
        name: '상담 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '/consult/write',
      },
      {
        href: '/detail',
        name: '상담 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/write',
        name: '상담 등록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/registered',
        name: '등록완료 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/reject',
        name: '오류/거부 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
    ],
  },
  {
    id: 2,
    href: '/subjects',
    // iconSrc: 'ico_work',
    iconSrc: 'xi-library-books-o',
    name: '과정관리',
    resetItems: [
      'resetSubjectPage',
      'resetSubjectFilterActive',
      'resetSubjectFilterSearch',
      'resetSubjectFilter',
    ],
    exposure: true,
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/subjects/write',
    children: [
      {
        href: '/detail',
        name: '과정 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/write',
        name: '과정 등록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
    ],
  },
  {
    id: 3,
    href: '/students',
    // iconSrc: 'ico_regist',
    iconSrc: 'xi-user-address',
    name: '수강생관리',
    resetItems: [
      'resetStudentPage',
      'resetStudentFilterActive',
      'resetStudentFilterSearch',
      'resetStudentFilter',
    ],
    exposure: true,
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/students/write',
    children: [
      {
        href: '/detail',
        name: '수강생 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/write',
        name: '수강생 등록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/edit',
        name: '수강생 수정',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
    ],
  },
  {
    id: 4,
    href: '/accounting',
    // iconSrc: 'ico_accounting',
    iconSrc: 'xi-money',
    name: '회계관리',
    grade: '회계팀',
    exposure: true,
    resetItems: [
      'resetPaymentPage',
      'resetPaymentFilterActive',
      'resetPaymentFilterSearch',
      'resetPaymentFilter',
      'resetRefundPage',
      'resetRefundFilterActive',
      'resetRefundFilterSearch',
      'resetRefundFilter',
      'resetReqRefundPage',
      'resetReqRefundFilterActive',
      'resetReqRefundFilterSearch',
      'resetReqRefundFilter',
    ],
    children: [
      {
        href: '/',
        name: '결제 내역',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
        grade: '회계팀',
      },
      {
        href: '/request',
        name: '환불 신청 내역',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
        grade: '회계팀',
      },
      {
        href: '/refund',
        name: '환불 완료 내역',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
        grade: '회계팀',
      },
      {
        href: '/sales',
        name: '매출 내역',
        exposure: true,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        grade: '회계팀',
      },
    ],
  },
  {
    id: 5,
    href: '/statistics',
    // iconSrc: 'ico_accounting',
    iconSrc: 'xi-chart-line',
    name: '통계',
    grade: '영업팀',
    exposure: true,
    resetItems: [],
    children: [
      {
        href: '/',
        name: '영업 성과',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
        grade: '영업팀',
      },
      {
        href: '/recruitment',
        name: '과정 모집',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
        grade: '교무팀',
      },
    ],
  },
  {
    href: '/member',
    iconSrc: '',
    name: '프로필',
    exposure: false,
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
    children: [],
  },
]

export default category
