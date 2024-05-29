import {
  SEARCH_PAYMENT_FILTER_MUTATION,
  SEARCH_STUDENTSTATE_MUTATION,
  SEARCH_STUDENT_FILTER_MUTATION,
} from '@/graphql/mutations'
import { categoryMenuState, navOpenState } from '@/lib/recoilAtoms'
import useMmeQuery from '@/utils/mMe'
import { useMutation } from '@apollo/client'
import { Tooltip } from '@nextui-org/react'
import { animate, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
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
  align-items: center;
`

const CateIcon = styled.figure`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
`
const CateTitle = styled.p<{ $navOpen: boolean }>`
  display: ${props => (props.$navOpen ? 'block' : 'none')};
  white-space: nowrap;
  width: ${props => (props.$navOpen ? 'auto' : '0')};
  padding-top: 0.12rem;
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

const MewIcon = styled.span<{ $navOpen: boolean }>`
  position: ${props => (props.$navOpen ? 'relative' : 'absolute')};
  right: ${props => (props.$navOpen ? 'auto' : '0.3rem')};
  top: ${props => (props.$navOpen ? 'auto' : '0')};
  color: #dd1e59;
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
  name,
  isActive,
  onClick,
  children,
  cateGrade = null,
}) {
  const router = useRouter()
  const { useMme } = useMmeQuery()
  const mGrade = useMme('mGrade')
  const mPart = useMme('mPart')

  const [navOpen, setNavOpen] = useRecoilState(navOpenState)
  const [isOpen, setIsOpen] = useRecoilState(categoryMenuState)
  const consultTotal = sessionStorage.getItem('newConsult')
  const studenTotal = sessionStorage.getItem('newStudent')
  const accounTingTotal = sessionStorage.getItem('newAccounting')

  const [newConsult, setNewConsult] = useState(false)
  const [newStudent, setNewStudent] = useState(false)
  const [newAccounting, setNewAccounting] = useState(false)
  const arrowRef = useRef(null)

  useEffect(() => {
    if (name === '상담관리') {
      if (parseInt(consultTotal) > 0) {
        setNewConsult(true)
      }
    }
    if (name === '수강생관리') {
      if (parseInt(studenTotal) > 0) {
        setNewStudent(true)
      }
    }
    if (name === '회계관리') {
      if (parseInt(accounTingTotal) > 0) {
        setNewAccounting(true)
      }
    }
  }, [consultTotal, studenTotal, accounTingTotal])

  useEffect(() => {
    if (arrowRef.current) {
      animate(
        arrowRef.current,
        { rotate: isOpen[name] ? 0 : 180 },
        { duration: 0.2 },
      )
    }
  }, [isOpen])

  const handleClick = cate => {
    setIsOpen(prevState => ({
      ...prevState,
      [cate]: !prevState[cate],
    }))
  }

  const subCate = children?.filter(category => category.exposure) || []

  const clickCate = (e, grade, link, name) => {
    e.preventDefault()

    if (grade) {
      if (mGrade <= 1 || mPart.includes(grade)) {
        router.push(link, undefined, { shallow: true, scroll: false })
      } else {
        alert('🚧 접근 권한이 없습니다. 🚧')
      }
    } else {
      if (name === '상담관리') {
        window.location.href = link
      } else {
        router.push(link, undefined, { shallow: true, scroll: false })
      }
    }
  }

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
          <Link href={'#'} onClick={e => clickCate(e, cateGrade, href, name)}>
            <CateLink $navOpen={navOpen}>
              <Tooltip
                content={name}
                placement="right"
                isDisabled={navOpen ? true : false}
              >
                <CateIcon
                  onClick={e => {
                    clickCate(e, cateGrade, href, name)
                  }}
                >
                  <i className={iconSrc} />

                  {/* {isActive ? (
      
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}_w.webp`}
                      alt={name}
                    />
                  ) : (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}.webp`}
                      alt={name}
                    />
                  )} */}
                </CateIcon>
              </Tooltip>
              <CateTitle $navOpen={navOpen}>{name}</CateTitle>
              {(newConsult || newStudent || newAccounting) && (
                <MewIcon $navOpen={navOpen}>
                  <i className="xi-new" />
                </MewIcon>
              )}
            </CateLink>
          </Link>
        ) : (
          <MenuBox>
            <MenuBtn
              $navOpen={navOpen}
              onClick={() => {
                handleClick(name)
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
                handleClick(name)
              }}
            >
              <Tooltip
                content={name}
                placement="right"
                isDisabled={navOpen ? true : false}
              >
                <CateIcon
                  onClick={e => {
                    clickCate(e, cateGrade, href, name)
                  }}
                >
                  <i className={iconSrc} />
                  {/* {isActive ? (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}_w.webp`}
                      alt={name}
                    />
                  ) : (
                    <img
                      src={`https://highclass-image.s3.amazonaws.com/admin/icon/${iconSrc}.webp`}
                      alt={name}
                    />
                  )} */}
                </CateIcon>
              </Tooltip>
              <CateTitle $navOpen={navOpen}>
                <Link
                  href={'#'}
                  onClick={e => clickCate(e, cateGrade, href, name)}
                >
                  {name}
                </Link>
              </CateTitle>
              {(newConsult || newStudent || newAccounting) && (
                <MewIcon $navOpen={navOpen}>
                  <i className="xi-new" />
                </MewIcon>
              )}
            </CateLink>

            {navOpen && (
              <Menu $isOpen={isOpen[name]}>
                {subCate?.map((item, index) => (
                  <MenuItem
                    key={index}
                    $isActive={router.pathname == item.href}
                  >
                    <Link
                      href={'#'}
                      onClick={e =>
                        clickCate(e, item.grade, href + item.href, name)
                      }
                    >
                      {item.name}
                    </Link>
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
