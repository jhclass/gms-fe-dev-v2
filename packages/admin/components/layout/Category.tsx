import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { activeCategoryState } from '@/lib/recoilAtoms'
import CategoryItem from './CategoryItem'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const CateWrap = styled(motion.ul)``

export default function Category() {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState)

  const categories = [
    {
      href: '/',
      iconSrc: 'ico_home',
      alt: '대시보드',
      label: '대시보드',
    },
    {
      href: '/consult',
      iconSrc: 'ico_consult',
      alt: '상담관리',
      label: '상담관리',
    },
    {
      href: '/registration',
      iconSrc: 'ico_regist',
      alt: '수강생등록',
      label: '수강생등록',
    },
    {
      href: '/accounting',
      iconSrc: 'ico_work',
      alt: '회계관리',
      label: '회계관리',
    },
  ]

  const router = useRouter()
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
            isActive={router.pathname === category.href}
            onClick={() => setActiveCategory(index)}
          />
        ))}
      </CateWrap>
    </>
  )
}
