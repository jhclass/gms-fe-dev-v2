import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { activeCategoryState } from '@/lib/recoilAtoms'
import useUserLogsMutation from '@/utils/userLogs'
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
      children: [
        {
          href: '/consult',
          alt: '상담목록',
          label: '상담목록',
        },
        {
          href: '/consult/reject',
          alt: '오류/거부 목록',
          label: '오류/거부 목록',
        },
      ],
    },
    {
      href: '/subjects',
      iconSrc: 'ico_work',
      alt: '과정관리',
      label: '과정관리',
    },
    {
      href: '/students',
      iconSrc: 'ico_regist',
      alt: '수강생관리',
      label: '수강생관리',
    },
    {
      href: '/accounting',
      iconSrc: 'ico_accounting',
      alt: '회계관리',
      label: '회계관리',
    },
  ]

  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])
  // const [active, setActive] = useState<boolean>(false)
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
              setActiveCategory(index)
            }}
            children={category.children}
          />
        ))}
      </CateWrap>
    </>
  )
}
