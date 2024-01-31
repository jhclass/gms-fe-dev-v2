import { useResetRecoilState } from 'recoil'
import {
  consultFilterActiveState,
  consultFilterState,
  consultPageState,
  consultSearchState,
  studentFilterActiveState,
  studentFilterState,
  studentPageState,
  studentSearchState,
  subjectFilterActiveState,
  subjectFilterState,
  subjectPageState,
  subjectSearchState,
} from './recoilAtoms'

interface Category {
  id?: number
  href: string
  iconSrc?: string
  alt: string
  label: string
  //   reset?: []
  reset?: () => void
  children?: Category[]
  isBreadcrumb?: boolean
  isFilter?: boolean
  isWrite?: string
  isVisibleInMenu: boolean
}
const consultPage = useResetRecoilState(consultPageState)
const resetConsultFilterActive = useResetRecoilState(consultFilterActiveState)
const resetConsultFilterSearch = useResetRecoilState(consultFilterState)
const resetConsultFilter = useResetRecoilState(consultSearchState)
const subjectPage = useResetRecoilState(subjectPageState)
const resetSubjectFilterActive = useResetRecoilState(subjectFilterActiveState)
const resetSubjectFilterSearch = useResetRecoilState(subjectFilterState)
const resetSubjectFilter = useResetRecoilState(subjectSearchState)
const studentPage = useResetRecoilState(studentPageState)
const resetStudentFilterActive = useResetRecoilState(studentFilterActiveState)
const resetStudentFilterSearch = useResetRecoilState(studentFilterState)
const resetStudentFilter = useResetRecoilState(studentSearchState)

// 예를 들어, 메뉴 아이템 배열을 정의하는 경우
const category: Category[] = [
  {
    id: 0,
    href: '/',
    iconSrc: 'ico_home',
    alt: '대시보드',
    label: '대시보드',
    reset: () => {},
    isBreadcrumb: false,
    isFilter: false,
    isWrite: '',
    isVisibleInMenu: true,
  },
  {
    id: 1,
    href: '/consult',
    iconSrc: 'ico_consult',
    alt: '상담관리',
    label: '상담관리',
    children: [
      {
        href: '/consult',
        alt: '상담목록',
        label: '상담목록',
        isBreadcrumb: true,
        isFilter: true,
        isWrite: '/consult/write',
        isVisibleInMenu: true,
      },
      {
        href: '/consult/registered',
        alt: '등록완료 목록',
        label: '등록완료 목록',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: true,
      },
      {
        href: '/consult/reject',
        alt: '오류/거부 목록',
        label: '오류/거부 목록',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: true,
      },
      {
        href: '/consult/detail',
        iconSrc: 'ico_consult',
        alt: '상담상세',
        label: '상담상세',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
      {
        href: '/consult/write',
        iconSrc: 'ico_consult',
        alt: '상담등록',
        label: '상담등록',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
    ],
    // reset: [
    //   consultPage,
    //   resetConsultFilterActive,
    //   resetConsultFilterSearch,
    //   resetConsultFilter,
    // ],
    // reset: () => {
    //   consultPage()
    //   resetConsultFilterActive()
    //   resetConsultFilterSearch()
    //   resetConsultFilter()
    // },
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/consult/write',
    isVisibleInMenu: true,
  },
  {
    id: 2,
    href: '/subjects',
    iconSrc: 'ico_work',
    alt: '과정관리',
    label: '과정관리',
    children: [
      {
        href: '/subjects/detail',
        iconSrc: 'ico_work',
        alt: '과정상세',
        label: '과정상세',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
      {
        href: '/subjects/write',
        iconSrc: 'ico_work',
        alt: '과정등록',
        label: '과정등록',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
    ],
    reset: () => {
      subjectPage()
      resetSubjectFilterActive()
      resetSubjectFilterSearch()
      resetSubjectFilter()
    },
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/subjects/write',
    isVisibleInMenu: true,
  },
  {
    id: 3,
    href: '/students',
    iconSrc: 'ico_regist',
    alt: '수강생관리',
    label: '수강생관리',
    children: [
      {
        href: '/students/detail',
        iconSrc: 'ico_consult',
        alt: '수강생상세',
        label: '수강생상세',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
      {
        href: '/students/write',
        iconSrc: 'ico_consult',
        alt: '수강생등록',
        label: '수강생등록',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
      {
        href: '/students/edit',
        iconSrc: 'ico_consult',
        alt: '수강생수정',
        label: '수강생수정',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: false,
      },
    ],
    reset: () => {
      studentPage()
      resetStudentFilterActive()
      resetStudentFilterSearch()
      resetStudentFilter()
    },
    isBreadcrumb: true,
    isFilter: true,
    isWrite: '/students/write',
    isVisibleInMenu: true,
  },
  {
    id: 4,
    href: '/accounting',
    iconSrc: 'ico_accounting',
    alt: '회계관리',
    label: '회계관리',
    reset: () => {},
    children: [
      {
        href: '/accounting',
        alt: '결제내역',
        label: '결제내역',
        isBreadcrumb: true,
        isFilter: false,
        isWrite: '',
        isVisibleInMenu: true,
      },
      {
        href: '/accounting/request',
        alt: '환불신청내역',
        label: '환불신청내역',
        isVisibleInMenu: true,
      },
      {
        href: '/accounting/refund',
        alt: '환불완료내역',
        label: '환불완료내역',
        isVisibleInMenu: true,
      },
      {
        href: '/accounting/sales',
        alt: '매출내역',
        label: '매출내역',
        isVisibleInMenu: true,
      },
    ],
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
    isVisibleInMenu: true,
  },
  {
    href: '/member',
    iconSrc: '',
    alt: '',
    label: '프로필',
    isBreadcrumb: true,
    isFilter: false,
    isWrite: '',
    isVisibleInMenu: false,
  },
]

export default category
