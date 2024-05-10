import { navOpenState } from '@/lib/recoilAtoms'
import { animate, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { MME_QUERY } from '@/graphql/queries'
import useUserLogsMutation from '@/utils/userLogs'
import useMmeQuery from '@/utils/mMe'
import { useDisclosure } from '@nextui-org/react'
import RequestMessage from '../modal/RequestMessage'
import HeaderNoti from '../common/HeaderNoti'

const HeaderSec = styled(motion.header)<{ $navOpen: boolean }>`
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
  border-bottom: 1px solid #d4d4d8;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
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
  position: relative;
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
  position: relative;
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
  position: relative;
`
const ReqBtn = styled.button`
  display: flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.2rem;
  position: relative;

  @media screen and (max-width: 1024px) {
    width: 2rem;
    height: 2rem;
  }
  img {
    width: 100%;
  }

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1.5rem;
    top: 50%;
    left: 3.1rem;
    margin-top: -0.75rem;
    background: #d4d4d8;
    transition: 0.3s;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid #d4d4d8;
  background: #4f46e5;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;

  @media screen and (max-width: 1024px) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
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
  top: 2.7rem;
  right: 0;
  cursor: default;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  pointer-events: ${props => (props.$headerUserMenu ? 'auto' : 'none')};

  li {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    &:hover {
      color: #007de9;
    }
  }
  button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.4rem 1rem;
  }
`

export default function Header() {
  const { userLogs } = useUserLogsMutation()
  const { loading, error, data, refetch } = useQuery(MME_QUERY)
  const { mMe } = data || {}
  const { mUserId = '', mUsername = '', mGrade = '' } = mMe || {}
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [headerUserMenu, setHeaderUserMenu] = useState(false)
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const toggleUserMenu = () => {
    setHeaderUserMenu(headerUserMenu => !headerUserMenu)
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
      <HeaderSec $navOpen={navOpen}>
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
          <HeaderNoti />
          {mGrade === 0 && (
            <ReqBtn onClick={onOpen}>
              <img
                src="https://highclass-image.s3.amazonaws.com/admin/icon/ico_help3.webp"
                alt="알림"
              />
            </ReqBtn>
          )}
          <UserBox onClick={toggleUserMenu}>
            <UserGrade>
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
