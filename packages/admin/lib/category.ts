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
    iconSrc: 'xi-home-o',
    name: '대시보드',
    exposure: true,
    isBreadcrumb: false,
    isFilter: false,
    isWrite: '',
    children: [],
  },
  {
    href: '/consult',
    iconSrc: 'xi-forum-o',
    name: '상담관리',
    resetItems: [
      'resetConsultPage',
      'resetConsultLimit',
      'resetConsultFilterActive',
      'resetConsultFilterSearch',
      'resetConsultFilter',
      'resetConsultFilterLimit',
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
    href: '/subjects',
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
    href: '/students',
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
    children: [
      {
        href: '/',
        name: '수강생 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '/students/write',
      },
      {
        href: '/nonassigned',
        name: '미배정 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
      },
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
    href: '/lecture',
    iconSrc: 'xi-presentation',
    name: '강의관리',
    resetItems: [],
    exposure: true,
    isBreadcrumb: true,
    isFilter: true,
    children: [
      {
        href: '/',
        name: '강의 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '/lecture/write',
      },
      {
        href: '/detail',
        name: '강의 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/attendance',
        name: '출석부',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/employment',
        name: '학적부 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
      },
      {
        href: '/employmentDetail',
        name: '학적부 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/write',
        name: '강의 등록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
    ],
  },
  {
    href: '/accounting',
    iconSrc: 'xi-money',
    name: '회계관리',
    grade: '회계팀',
    exposure: true,
    resetItems: [
      'resetPaymentPage',
      'resetPaymentFilterActive',
      'resetPaymentFilterSearch',
      'resetPaymentFilter',
      'resetPaymentDetailPage',
      'resetPaymentDetailFilterActive',
      'resetPaymentDetailFilterSearch',
      'resetPaymentDetailFilterPage',
      'resetPaymentDetailFilter',
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
        href: '/outstanding',
        name: '미수금 내역',
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
    href: '/statistics',
    iconSrc: 'xi-chart-line',
    name: '통계',
    grade: '영업팀',
    exposure: true,
    resetItems: [
      'resetParformanceFilterActiveState',
      'resetParformanceFilterState',
      'resetParformanceSearchState',
      'resetRecruitmentFilterActiveState',
      'resetRecruitmentPageState',
      'resetRecruitmentFilterState',
      'resetRecruitmentSearchState',
    ],
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
    href: '/hr',
    iconSrc: 'xi-users-o',
    name: '인사관리',
    resetItems: [],
    exposure: true,
    isBreadcrumb: true,
    isFilter: true,
    children: [
      {
        href: '/',
        name: '직원 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '/hr/write',
      },
      {
        href: '/detail',
        name: '직원 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/write',
        name: '직원 등록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/teacher',
        name: '강사 목록',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '/hr/teacherWrite',
      },
      {
        href: '/teacherDetail',
        name: '강사 상세',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
      {
        href: '/teacherWrite',
        name: '강사 등록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
    ],
  },
  {
    href: '/message',
    iconSrc: 'xi-mail-o',
    name: '메시지',
    resetItems: [],
    exposure: true,
    children: [
      {
        href: '/',
        name: '받은요청 목록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
      },
      {
        href: '/request',
        name: '보낸요청 목록',
        exposure: false,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
      },
      {
        href: '/sms',
        name: '문자발송',
        exposure: true,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
      },
    ],
  },
  {
    href: '/setting',
    iconSrc: 'xi-cog',
    name: '환경설정',
    resetItems: [],
    exposure: true,
    children: [
      {
        href: '/types',
        name: '분야관리',
        exposure: true,
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '',
      },
      {
        href: '/permissions',
        name: '권한설정',
        exposure: true,
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
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
  {
    href: '/testCate',
    iconSrc: '',
    name: '테스트 출석부',
    exposure: false,
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
    children: [],
  },
  {
    href: '/testCate/testDates',
    iconSrc: '',
    name: '테스트 달력',
    exposure: false,
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
    children: [],
  },
]

export default category
