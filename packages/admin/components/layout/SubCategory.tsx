import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { isScreenState, navOpenState, navSubCateState } from '@/lib/recoilAtoms'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import categories from '@/lib/category'
import { ScrollShadow } from '@nextui-org/react'

const CateWrap = styled.div<{ $navOpen: boolean }>`
  width: 100%;
  height: 3rem;
  position: relative;
  display: ${props => (props.$navOpen ? 'none' : 'block')};

  @media screen and (max-width: 1024px) {
    display: block;
  }
`

const CateBox = styled(motion.div)`
  max-width: calc(100% - 5rem);
  width: 100%;
  height: 3rem;
  position: fixed;
  right: 0;
  top: 4rem;
  z-index: 39;
  border-bottom: 1px solid #d4d4d8;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  background-color: #fff;

  @media screen and (max-width: 1024px) {
    height: 2rem;
    max-width: 100%;
    width: calc(100vw);
  }
`
const MenuBox = styled.div`
  display: flex;
  padding: 0 1rem;
  justify-content: flex-start;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
  height: 100%;
`
const MenuItem = styled.div<{ $isActive: boolean }>`
  flex-shrink: 0;
  width: fit-content;
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
  const [isSubCate, setIsSubCate] = useRecoilState(navSubCateState)

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
  }, [isScreen])

  useEffect(() => {
    if (!navOpen && currentCategory) {
      if (currentCategory.children.filter(child => child.exposure).length > 0) {
        setIsSubCate(true)
      } else {
        setIsSubCate(false)
      }
    } else {
      setIsSubCate(false)
    }
  }, [currentCategory, navOpen])

  useEffect(() => {
    const findCategory = path => {
      let matchCategory = null
      const pathParts = path.split('/').filter(Boolean)

      for (let i = pathParts.length; i >= 0; i--) {
        const partialPath = `/${pathParts.slice(0, i).join('/')}`
        matchCategory = categories.find(
          cat =>
            cat.href === partialPath ||
            cat.children.some(
              child => `${cat.href}${child.href}` === partialPath,
            ),
        )
        if (matchCategory) break
      }

      return matchCategory
    }

    setCurrentCategory(findCategory(currentPath))
  }, [currentPath])

  const getFullHref = (parentHref, childHref) => {
    return childHref === '/' ? parentHref : parentHref + childHref
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
          <CateWrap $navOpen={navOpen}>
            <CateBox>
              <ScrollShadow
                orientation="horizontal"
                className="h-full scrollbar scrollbar_s"
              >
                <MenuBox>
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
                </MenuBox>
              </ScrollShadow>
            </CateBox>
          </CateWrap>
        )}
    </>
  )
}
