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
  studentSearchState,
  subjectFilterActiveState,
  subjectFilterState,
  subjectPageState,
  subjectSearchState,
} from '@/lib/recoilAtoms'
import CategoryItem from './CategoryItem'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import categories from '@/lib/category'

const CateWrap = styled(motion.ul)``

export default function Category() {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState)

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
      children: [
        {
          href: '/accounting',
          alt: '결제내역',
          label: '결제내역',
        },
        {
          href: '/accounting/request',
          alt: '환불신청내역',
          label: '환불신청내역',
        },
        {
          href: '/accounting/refund',
          alt: '환불완료내역',
          label: '환불완료내역',
        },
        {
          href: '/accounting/sales',
          alt: '매출내역',
          label: '매출내역',
        },
      ],
    },
  ]

  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])

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
