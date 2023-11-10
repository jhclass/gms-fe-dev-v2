import { headerUserMenuState } from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

const HeaderCon = styled.header`
  width: 100vw;
  height: 4rem;
  position: fixed;
  display:flex;
  right:0;
  top:0;
  padding: 0 1rem;
  justify-content: end;
  align-items: center;
  border-bottom: 1px solid #d4d4d8;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3)
`
const HeaderRt = styled.button`
  display:flex;
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
  display:flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  position: relative;
`

const NotiNum = styled.span`
  display:flex;
  align-items: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  position: absolute;
  right:-0.2rem;
  top:-0.2rem;
  background: #007de9;
  font-size: 0.8rem;
  color: #fff;
  line-height: 1rem;
  justify-content: center;
`

const UserBox = styled.button`
  display:flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`

const UserGrade = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid #d4d4d8;
  background: #4f46e5;
  text-align:center;
  font-size:1.5rem;
  font-weight: 700;
  color: #fff;
  line-height:2.2rem;
`

const UserInfo = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
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

const DropUser = styled(motion.div)`
  position:absolute;
  width: 8rem;
  padding: 0.5rem 0;
  top: 2.5rem;
  right: 0rem;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid #d4d4d8;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);

  ul {
  }
  
  li {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;

    &:hover {
      color: #007de9;
    }
  }
`

export default function Header() {

  const [headerUserMenu, setHeaderUserMenu] = useRecoilState(headerUserMenuState);

  const toggleUserMenu = () => {
    setHeaderUserMenu((headerUserMenu) => !headerUserMenu);
  };

  return (
    <>
      <HeaderCon>
        <HeaderRt>
          <NotiBtn>
            <img src="/src/icon/ico_noti.png" />
            <NotiNum>0</NotiNum>
          </NotiBtn>
          <UserBox onClick={toggleUserMenu}>
            <UserGrade>
              M
            </UserGrade>
            <UserInfo>
              <UserId>HongHong123</UserId>
              <UserName>홍길동</UserName>
            </UserInfo>
            <span>
              <i className="text-zinc-500 xi-angle-down-min" />
            </span>
            {headerUserMenu && (
              <DropUser
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ul>
                  <li>
                    <button>
                      프로필
                    </button>
                  </li>
                  <li>
                    <button>
                      로그아웃
                    </button>
                  </li>
                </ul>
              </DropUser>
            )}
          </UserBox>
        </HeaderRt>
      </HeaderCon>
    </>
  )
}
