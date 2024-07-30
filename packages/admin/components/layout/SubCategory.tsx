import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { isScreenState, navOpenState } from '@/lib/recoilAtoms'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import categories from '@/lib/category'

const CateWrap = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
`

const CateBox = styled(motion.ul)<{ $navOpen: boolean }>`
  max-width: ${props =>
    props.$navOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)'};
  width: 100%;
  height: 3rem;
  position: fixed;
  display: flex;
  right: 0;
  top: 4rem;
  padding: 0 1rem;
  z-index: 40;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid #d4d4d8;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  background-color: #fff;

  @media screen and (max-width: 1024px) {
    height: 2rem;
    max-width: 100%;
    width: calc(100vw);
  }
`

const MenuItem = styled.li<{ $isActive: boolean }>`
  color: ${props =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.gray};

  a {
    display: block;
    width: 100%;
  }
`

export default function SubCategory() {
  const router = useRouter()
  const currentPath = router.pathname
  const [currentCategory, setCurrentCategory] = useState(null)
  const [isScreen, setIsScreen] = useRecoilState(isScreenState)
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 1024
      setIsScreen(isSmall)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setIsScreen])

  useEffect(() => {
    if (isScreen) {
      setNavOpen(false)
    }
  }, [isScreen, setNavOpen])

  useEffect(() => {
    const findCategory = path => {
      for (const cat of categories) {
        if (cat.href === path) return cat
        for (const child of cat.children) {
          if (cat.href + child.href === path) return cat
        }
      }
      return null
    }

    setCurrentCategory(findCategory(currentPath))
  }, [currentPath, categories])

  const getFullHref = (parentHref, childHref) => {
    return childHref === '/' ? childHref : parentHref + childHref
  }

  const isActive = (parentHref, childHref, currentPath) => {
    if (childHref === '/') {
      return parentHref === currentPath
    }
    return parentHref + childHref === currentPath
  }

  return (
    <>
      {currentCategory &&
        currentCategory.children.filter(child => child.exposure).length > 0 && (
          <CateWrap>
            <CateBox $navOpen={navOpen}>
              {currentCategory.children
                .filter(child => child.exposure)
                .map((child, index) => (
                  <MenuItem
                    key={index}
                    $isActive={isActive(
                      currentCategory.href,
                      child.href,
                      currentPath,
                    )}
                  >
                    <a href={getFullHref(currentCategory.href, child.href)}>
                      {child.name}
                    </a>
                  </MenuItem>
                ))}
            </CateBox>
          </CateWrap>
        )}
    </>
  )
}
