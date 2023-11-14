import { headerUserMenuState, navOpenState } from '@/lib/recoilAtoms'
import { animate, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { LogUserOut } from '@/lib/apolloClient'

const HeaderSec = styled(motion.header)<{ $navOpen: boolean }>`
  max-width: ${props =>
    props.$navOpen ? 'calc(100vw - 18rem)' : 'calc(100vw - 5rem)'};
  width: 100%;
  height: 4rem;
  position: fixed;
  display: flex;
  right: 0;
  top: 0;
  padding: 0 1rem;
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
  gap: 1.8rem;
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

const HeaderRt = styled.div`
  display: flex;
  gap: 1.8rem;
  align-items: center;
  position: relative;

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

const NotiBtn = styled.button`
  display: flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;
`

const NotiNum = styled.span`
  display: flex;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  position: absolute;
  right: -0.2rem;
  top: -0.2rem;
  background: #007de9;
  font-size: 0.8rem;
  color: #fff;
  line-height: 1rem;
  justify-content: center;
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  cursor: pointer;
`

const UserGrade = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid #d4d4d8;
  background: #4f46e5;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 2.2rem;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`

const UserId = styled.span`
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 0.1rem;
  font-weight: 600;
`

const UserName = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #3f3f46;
`
const IconArrow = styled.span`
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
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  pointer-events: ${props => (props.$headerUserMenu ? 'auto' : 'none')};

  ul {
  }

  li {
    display: flex;
    align-items: center;
    padding: 0.4rem 1rem;
    font-size: 0.875rem;

    &:hover {
      color: #007de9;
    }
  }
`

export default function Header() {
  const [headerUserMenu, setHeaderUserMenu] =
    useRecoilState(headerUserMenuState)
  const [navOpen, setNavOpen] = useRecoilState(navOpenState)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const toggleUserMenu = () => {
    setHeaderUserMenu(headerUserMenu => !headerUserMenu)
  }

  useEffect(() => {
    animate(
      '.xi-hamburger-back',
      { rotate: navOpen ? 0 : 180 },
      { duration: 0.2 },
    )
    animate(
      '.xi-angle-down-min',
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
  }, [navOpen, headerUserMenu])

  console.log(navOpen)

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
        <HeaderRt>
          <NotiBtn>
            <img src="/src/icon/ico_noti.png" alt="알림" />
            <NotiNum>0</NotiNum>
          </NotiBtn>
          <UserBox onClick={toggleUserMenu}>
            <UserGrade>M</UserGrade>
            <UserInfo>
              <UserId>HongHong123</UserId>
              <UserName>홍길동</UserName>
            </UserInfo>
            <IconArrow>
              <i className="text-zinc-500 xi-angle-down-min" />
            </IconArrow>

            <DropUser
              $headerUserMenu={headerUserMenu}
              className="drop"
              style={{
                clipPath: 'inset(10% 50% 90% 50% round 10px)',
              }}
            >
              <ul>
                <li>
                  <button>프로필</button>
                </li>
                <li>
                  <button onClick={LogUserOut}>로그아웃</button>
                </li>
              </ul>
            </DropUser>
          </UserBox>
        </HeaderRt>
      </HeaderSec>
    </>
  )
}