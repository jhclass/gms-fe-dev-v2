import { navOpenState, navSubCateState } from '@/lib/recoilAtoms'
import { animate, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled, { useTheme } from 'styled-components'
import { useQuery } from '@apollo/client'
import { MME_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import { Tooltip, useDisclosure } from '@nextui-org/react'
import RequestMessage from '@/components/modal/RequestMessage'
import HeaderNoti from '@/components/common/HeaderNoti'

const HeaderSec = styled(motion.header)<{
  $navOpen: boolean
  $isSubCate: boolean
}>`
  max-width: ${props =>
    props.$navOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)'};
  width: 100%;
  height: 4rem;
  position: fixed;
  display: flex;
  right: 0;
  top: 0;
  padding: 0 1rem;
  z-index: 40;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: ${props =>
    props.$isSubCate
      ? '0 0 1rem rgba(0, 0, 0, 0);'
      : '0 0 1rem rgba(0, 0, 0, 0.3);'};
  background-color: #fff;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
    width: calc(100vw);
  }
`
const HeaderLt = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const MenuBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  font-size: 1.5rem;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`
const MenuBtnMo = styled(motion.button)`
  display: none;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  font-size: 1.5rem;

  @media screen and (max-width: 1024px) {
    display: flex;
  }
`

const HeaderCt = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  align-items: center;
  scale: 0;
  transition: 0.3s;

  @media screen and (max-width: 1024px) {
    display: flex;
    scale: 1;
  }
`

const Logo = styled.h1`
  display: flex;
  align-items: center;

  img {
    height: 2.3rem;
  }
`

const HeaderRt = styled.div`
  display: flex;
  gap: 1.8rem;
  align-items: center;

  @media screen and (max-width: 1024px) {
    gap: 1rem;
  }
`

const WebBtn = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1.8rem;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1.5rem;
    top: 50%;
    right: -0.9rem;
    margin-top: -0.75rem;
    background: ${({ theme }) => theme.colors.lightGray};
    transition: 0.3s;
  }

  @media screen and (max-width: 1024px) {
    width: 2rem;
    font-size: 1.5rem;
    &:after {
      right: -0.4rem;
    }
  }

  @media screen and (max-width: 460px) {
    display: none;
  }
`
const ReqBtn = styled.button`
  display: flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.2rem;
  position: relative;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1.5rem;
    top: 50%;
    right: -0.9rem;
    margin-top: -0.75rem;
    background: ${({ theme }) => theme.colors.lightGray};
    transition: 0.3s;
  }

  img {
    width: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 2rem;
    height: 2rem;

    &:after {
      right: -0.4rem;
    }
  }

  @media screen and (max-width: 604px) {
    width: 3rem;
    height: 3rem;
    background: #fff;
    border: 4px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 100%;
    padding: 0.3rem;
    position: fixed;
    bottom: 1.5rem;
    left: 2rem;

    &:after {
      display: none;
    }
  }
`
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  cursor: pointer;
`

const UserGrade = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border-radius: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  line-height: 2.5rem;

  @media screen and (max-width: 1024px) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    line-height: 2rem;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`

const UserId = styled.p`
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 0.1rem;
  font-weight: 600;
`

const UserName = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #3f3f46;
`
const IconArrow = styled.p`
  display: block;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`

const DropUser = styled(motion.div)<{ $headerUserMenu: boolean }>`
  position: absolute;
  width: 8rem;
  padding: 0.5rem 0;
  top: 3.2rem;
  right: 50%;
  margin-right: -4rem;
  cursor: default;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  pointer-events: ${props => (props.$headerUserMenu ? 'auto' : 'none')};
  @media screen and (max-width: 1024px) {
    top: 3rem;
    right: -1rem;
    margin-right: 0;
  }
  li {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.4rem 1rem;
  }
`
const LodingDiv = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Header() {
  const theme = useTheme()
  const { userLogs } = useUserLogsMutation()
  const { loading, error, data, refetch } = useQuery(MME_QUERY)
  const { mMe } = data || {}
  const { mUserId = '', mUsername = '', mGrade = '', mAvatar = '' } = mMe || {}
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [headerUserMenu, setHeaderUserMenu] = useState(false)
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)
  const [isSubCate, setIsSubCate] = useRecoilState(navSubCateState)
  const userMenuRef = useRef(null)

  const handleClickOutside = event => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setHeaderUserMenu(false)
    }
  }

  useEffect(() => {
    if (headerUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [headerUserMenu])

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const toggleUserMenu = () => {
    setHeaderUserMenu(!headerUserMenu)
  }

  const gradeStr = data => {
    if (data == null) {
      return 'A'
    } else {
      const idF = data?.charAt(0).toUpperCase()
      return idF
    }
  }

  const LogUserOut = () => {
    userLogs(`로그아웃`)
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    refetch()
  }, [router])

  useEffect(() => {
    animate(
      '.xi-hamburger-back',
      { rotate: navOpen ? 0 : 180 },
      { duration: 0.2 },
    )
  }, [navOpen])

  useEffect(() => {
    animate(
      '.userArrow',
      { rotate: headerUserMenu ? 180 : 0 },
      { duration: 0.2 },
    )
    animate(
      '.drop',
      {
        clipPath: headerUserMenu
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.4,
      },
    )
  }, [headerUserMenu])

  if (error) {
    console.log(error)
  }

  return (
    <>
      <HeaderSec $navOpen={navOpen} $isSubCate={isSubCate}>
        <HeaderLt>
          <MenuBtn onClick={toggleNav}>
            <i className="text-zinc-500 xi-hamburger-back" />
          </MenuBtn>
          <MenuBtnMo onClick={toggleNav}>
            <i className="text-zinc-500 xi-bars" />
          </MenuBtnMo>
        </HeaderLt>
        <HeaderCt>
          <Logo>
            <Link href="/">
              <img
                src="https://highclass-image.s3.amazonaws.com/admin/common/H_simbol_b.svg"
                alt="H Academy Admin"
              />
            </Link>
          </Logo>
        </HeaderCt>
        <HeaderRt>
          <Tooltip
            content="아카데미 홈페이지 바로가기"
            placement="left"
            isDisabled={navOpen ? true : false}
          >
            <WebBtn
              href={`${process.env.NEXT_PUBLIC_ACADEMY_URI}`}
              target="_blank"
            >
              <i className="xi-desktop" />
            </WebBtn>
          </Tooltip>
          <HeaderNoti />
          {mGrade === 0 && (
            <ReqBtn onClick={onOpen}>
              <img
                src="https://highclass-image.s3.amazonaws.com/admin/icon/ico_help3.webp"
                alt="알림"
              />
            </ReqBtn>
          )}
          <UserBox ref={userMenuRef} onClick={toggleUserMenu}>
            <UserGrade>
              {mAvatar ? (
                <UserGrade
                  style={{
                    backgroundImage: `url('${mAvatar}')`,
                  }}
                ></UserGrade>
              ) : (
                <UserGrade
                  style={{
                    backgroundColor: theme.colors.teriary,
                  }}
                >
                  {gradeStr(mUserId)}
                </UserGrade>
              )}
              <span>{gradeStr(mUserId)}</span>
            </UserGrade>
            <UserInfo>
              <UserId>{mUserId}</UserId>
              <UserName>{mUsername}</UserName>
            </UserInfo>
            <IconArrow>
              <i className="text-zinc-500 userArrow xi-angle-down-min" />
            </IconArrow>
            <DropUser
              $headerUserMenu={headerUserMenu}
              className="drop"
              style={{
                clipPath: 'inset(10% 50% 90% 50% round 10px)',
              }}
              onClick={e => {
                e.preventDefault()
              }}
            >
              <ul>
                <li>
                  <button
                    onClick={() => {
                      router.push('/member')
                    }}
                  >
                    프로필
                  </button>
                </li>
                <li>
                  <button onClick={LogUserOut}>로그아웃</button>
                </li>
              </ul>
            </DropUser>
          </UserBox>
        </HeaderRt>
      </HeaderSec>
      <RequestMessage
        isOpen={isOpen}
        onClose={onClose}
        managerId={mUserId}
        managerName={mUsername}
      />
    </>
  )
}
