import { motion } from 'framer-motion'
import { useRecoilState, useResetRecoilState } from 'recoil'
import {
  activeCategoryState,
  consultFilterActiveState,
  consultFilterState,
  consultPageState,
  consultSearchState,
  studentFilterActiveState,
  studentFilterState,
  studentPageState,
  subjectFilterActiveState,
  subjectFilterState,
  subjectPageState,
  subjectSearchState,
} from '@/lib/recoilAtoms'
import CategoryItem from './CategoryItem'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CateWrap = styled(motion.ul)``

export default function Category() {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState)

  const categories = [
    {
      id: 0,
      href: '/',
      iconSrc: 'ico_home',
      alt: '대시보드',
      label: '대시보드',
      reset: () => {},
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
        },
        {
          href: '/consult/registered',
          alt: '등록완료 목록',
          label: '등록완료 목록',
        },
        {
          href: '/consult/reject',
          alt: '오류/거부 목록',
          label: '오류/거부 목록',
        },
      ],
      reset: () => {
        consultPage()
        resetConsultFilterActive()
        resetConsultFilterSearch()
        resetConsultFilter()
      },
    },
    {
      id: 2,
      href: '/subjects',
      iconSrc: 'ico_work',
      alt: '과정관리',
      label: '과정관리',
      reset: () => {
        subjectPage()
        resetSubjectFilterActive()
        resetSubjectFilterSearch()
        resetSubjectFilter()
      },
    },
    {
      id: 3,
      href: '/students',
      iconSrc: 'ico_regist',
      alt: '수강생관리',
      label: '수강생관리',
      reset: () => {
        studentPage()
        resetStudentFilterActive()
        resetStudentFilterSearch()
        resetStudentFilter()
      },
    },
    {
      id: 4,
      href: '/accounting',
      iconSrc: 'ico_accounting',
      alt: '회계관리',
      label: '회계관리',
      reset: () => {},
      // children: [
      //   {
      //     href: '/accounting',
      //     alt: '결제내역',
      //     label: '결제내역',
      //   },
      //   {
      //     href: '/accounting/reject',
      //     alt: '미수납내역',
      //     label: '미수납내역',
      //   },
      //   {
      //     href: '/accounting/reject',
      //     alt: '환불내역',
      //     label: '환불내역',
      //   },
      //   {
      //     href: '/accounting/reject',
      //     alt: '환불신청내역',
      //     label: '환불신청내역',
      //   },
      //   {
      //     href: '/accounting/reject',
      //     alt: '카드결제내역',
      //     label: '카드결제내역',
      //   },
      //   {
      //     href: '/accounting/reject',
      //     alt: '입금내역',
      //     label: '입금내역',
      //   },
      // ],
    },
  ]

  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])
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
  const resetStudentFilter = useResetRecoilState(studentFilterState)

  useEffect(() => {
    const pathnames = router.pathname.split('/').filter(x => x)
    if (pathnames === undefined) {
      setBreadcrumb([''])
    } else {
      setBreadcrumb(pathnames)
    }
  }, [router.pathname])
  const active = breadcrumb[0] === undefined ? '/' : `/${breadcrumb[0]}`
  return (
    <>
      <CateWrap>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            href={category.href}
            iconSrc={category.iconSrc}
            alt={category.alt}
            label={category.label}
            isActive={active === category.href}
            onClick={() => {
              setActiveCategory(category.id)
              category.reset()
            }}
            children={category.children}
          />
        ))}
      </CateWrap>
    </>
  )
}
