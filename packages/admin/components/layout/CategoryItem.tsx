import { categoryMenuState, navOpenState } from '@/lib/recoilAtoms'
import { Tooltip } from '@nextui-org/react'
import { animate, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { styled } from 'styled-components'

type CategoryItemProps = {
  href: string
  iconSrc: string
  alt: string
  label: string
  isActive: boolean
  children: [href: string, alt: string, label: string]
  onClick: () => void
}

const CateItem = styled(motion.li)`
  position: relative;
  z-index: 40;
  margin-top: 0.25rem;
`

const CateLink = styled(motion.div)<{ $navOpen: boolean }>`
  line-height: 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  column-gap: ${props => (props.$navOpen ? '0.75rem' : '0')};
  justify-content: ${props => (props.$navOpen ? 'start' : 'center')};
  display: flex;
  width: 100%;
  height: 100%;
  color: inherit;
`

const CateIcon = styled.figure`
  width: 1.5rem;
  height: 1.5rem;
`
const CateTitle = styled.p<{ $navOpen: boolean }>`
  display: ${props => (props.$navOpen ? 'block' : 'none')};
  white-space: nowrap;
  width: ${props => (props.$navOpen ? 'auto' : '0')};
`
const MenuBox = styled(motion.div)`
  cursor: pointer;
  position: relative;
`
const MenuBtn = styled(motion.button)<{ $navOpen: boolean }>`
  position: absolute;
  display: ${props => (props.$navOpen ? 'flex' : 'none')};
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
`
const Menu = styled(motion.ul)<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  padding: 1rem;
  background: #d9e3fa;
  gap: 0.5rem;
  flex-direction: column;
  width: 100%;
  border-radius: 0 0 0.375rem 0.375rem;
`
const MenuItem = styled.li<{ $isActive: boolean }>`
  width: 100%;
  color: ${props => (props.$isActive ? '#007de9' : '#71717a')};

  a {
    display: block;
    width: 100%;
  }
`

const CateActive = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  background: #007de9;
  z-index: -1;
  border-radius: 0.375rem;
  width: 100%;
  height: 100%;
`

const cateName = {
  close: {
    // scale: 0.5,
    // opacity: 0,
    // width: 0,
    // height: 0,
    // transition: {},
  },
  open: {
    // scale: 1,
    // opacity: 1,
    // width: '100%',
    // transition: {},
  },
}

export default function CategoryItem<CategoryItemProps>({
  href,
  iconSrc,
  alt,
  label,
  isActive,
  onClick,
  children,
}) {
  const router = useRouter()
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)
  const [isOpen, setIsOpen] = useRecoilState(categoryMenuState)
  const arrowRef = useRef(null)

  useEffect(() => {
    if (arrowRef.current) {
      animate(
        arrowRef.current,
        { rotate: isOpen[label] ? 0 : 180 },
        { duration: 0.2 },
      )
    }
  }, [isOpen])

  const handleClick = name => {
    setIsOpen(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }))
  }

  const subCate = children?.filter(category => category.exposure)
  return (
    <>
      <CateItem
        onClick={onClick}
        animate={{
          color: isActive ? '#fff' : '#007de9',
          transition: { duration: 0.3 },
        }}
      >
        {!children || subCate.length === 0 ? (
          <Link href={href}>
            <CateLink $navOpen={navOpen}>
              <Tooltip
                content={label}
                placement="right"
                isDisabled={navOpen ? true : false}
              >
                <CateIcon
                  onClick={e => {
                    e.preventDefault()
                    router.push(href)
                  }}
                >
                  {isActive ? (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}_w.webp`}
                      alt={alt}
                    />
                  ) : (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}.webp`}
                      alt={alt}
                    />
                  )}
                </CateIcon>
              </Tooltip>
              <CateTitle $navOpen={navOpen}>{label}</CateTitle>
            </CateLink>
          </Link>
        ) : (
          <MenuBox>
            <MenuBtn
              $navOpen={navOpen}
              onClick={() => {
                handleClick(label)
              }}
            >
              <i
                ref={arrowRef}
                className={`${
                  isActive ? 'color-white' : 'color-[#0007de9]'
                } xi-angle-up-min`}
              />
            </MenuBtn>

            <CateLink
              $navOpen={navOpen}
              onClick={() => {
                handleClick(label)
              }}
            >
              <Tooltip
                content={label}
                placement="right"
                isDisabled={navOpen ? true : false}
              >
                <CateIcon
                  onClick={e => {
                    e.preventDefault()
                    router.push(href)
                  }}
                >
                  {isActive ? (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}_w.webp`}
                      alt={alt}
                    />
                  ) : (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}.webp`}
                      alt={alt}
                    />
                  )}
                </CateIcon>
              </Tooltip>
              <CateTitle $navOpen={navOpen}>
                <Link href={href}>{label}</Link>
              </CateTitle>
            </CateLink>

            {navOpen && (
              <Menu $isOpen={isOpen[label]}>
                {subCate.map((item, index) => (
                  <MenuItem
                    key={index}
                    $isActive={router.pathname == item.href}
                  >
                    <Link href={href + item.href}>{item.label}</Link>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </MenuBox>
        )}
        {isActive && <CateActive layoutId="activeCate" />}
      </CateItem>
    </>
  )
}
