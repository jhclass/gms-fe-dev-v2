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
import categories from '@/lib/category'

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

  const resetFunctions = {
    consultPage,
    resetConsultFilterActive,
    resetConsultFilterSearch,
    resetConsultFilter,
    subjectPage,
    resetSubjectFilterActive,
    resetSubjectFilterSearch,
    resetSubjectFilter,
    studentPage,
    resetStudentFilterActive,
    resetStudentFilterSearch,
    resetStudentFilter,
  }

  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])
  const handleCategoryClick = (categoryId, resetItems) => {
    setActiveCategory(categoryId)

    resetItems?.forEach(item => {
      const resetFunction = resetFunctions[item]
      if (resetFunction) {
        resetFunction()
      }
    })
  }

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
        {categories
          .filter(category => category.exposure)
          .map((category, index) => (
            <CategoryItem
              key={index}
              href={category.href}
              iconSrc={category.iconSrc}
              name={category.name}
              isActive={active === category.href}
              onClick={() => {
                handleCategoryClick(category.id, category.resetItems)
              }}
              children={category.children}
            />
          ))}
      </CateWrap>
    </>
  )
}
