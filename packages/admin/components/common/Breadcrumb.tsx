import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'

const BreadcrumbBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const CateTitle = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 1.25;
  letter-spacing: -0.025em;
`
const BoxRt = styled.div`
  display: flex;
`

const FilterBtn = styled(motion.button)`
  display: flex;
  height: 2rem;
  border: 1px solid #007de9;
  border-radius: 0.5rem;
  align-items: center;
`

const ActiveIcon = styled(motion.i)`
  padding: 0.5rem;
  color: #fff;
`

const FilterVariants = {
  initial: {
    padding: '0 1rem',
    background: '#fff',
    color: '#007de9',
    transition: {},
  },
  active: {
    padding: '0 1rem 0 0.5rem',
    background: '#007de9',
    color: '#fff',
    transition: {},
  },
}

const IconVariants = {
  initial: {
    scale: 0,
    display: 'none',
  },
  active: {
    scale: 1,
    display: 'inline',
  },
}

export default function Breadcrumb({ isActive, onFilterToggle }) {
  const router = useRouter()
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])

  useEffect(() => {
    const pathnames = router.asPath.split('/').filter(x => x)
    setBreadcrumb(pathnames)
  }, [router.asPath])

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
      iconSrc: 'ico_work',
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

  return (
    <>
      <BreadcrumbBox>
        <CateTitle>
          {breadcrumb.map((name, index) => {
            const currentItem = categories.find(
              item => item.href === `/${name}`,
            )
            return (
              <span key={index}>
                {index > 0 && ' > '}
                {index < breadcrumb.length - 1 ? (
                  <a href={currentItem?.href}>{currentItem?.label}</a>
                ) : (
                  currentItem?.label
                )}
              </span>
            )
          })}
        </CateTitle>
        <BoxRt>
          <FilterBtn
            variants={FilterVariants}
            initial="initial"
            animate={isActive ? 'active' : 'initial'}
            onClick={() => {
              onFilterToggle(prev => !prev)
            }}
          >
            <ActiveIcon
              variants={IconVariants}
              initial="initial"
              animate={isActive ? 'active' : 'initial'}
              className="xi-check-min"
            />
            Filter
          </FilterBtn>
        </BoxRt>
      </BreadcrumbBox>
    </>
  )
}
