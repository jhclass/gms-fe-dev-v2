import { headerUserMenuState, navOpenState } from '@/lib/recoilAtoms'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import Category from '@/components/Category'

const NavSec = styled(motion.div)<{$navOpen:boolean}>`
  display: flex;
  width: ${(props) => (props.$navOpen ? '18rem' : '5rem')};
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  background: #fff;
  transition: 0.3s;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
    width: 80vw;
    padding: 0 1rem;
    transform: ${(props) => (props.$navOpen ? 'translatex(0);' : 'translatex(-100%);')}
  }
`

const NavWrap = styled(motion.div)<{$navOpen:boolean}>`
  overflow-y: auto;
  row-gap: 1.25rem;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  padding: ${(props) => (props.$navOpen ? ' 0 1.5rem 1rem' : ' 0 0.7rem 1rem')};

  @media screen and (max-width: 1024px) {
    padding: 0 1.5rem 1rem;
  }
`

const Logo = styled(motion.h1)<{$navOpen:boolean}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$navOpen ? 'start' : 'center')};
  width: 100%;
  height: 4rem;
  flex-shrink: 0;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    justify-content: start;
  }
`
const LogoImg = styled(motion.img)<{$navOpen:boolean}>`
  max-width: ${(props) => (props.$navOpen ? 'none' : '100%')};
  height: ${(props) => (props.$navOpen ? '2rem' : '2.5rem')};

  @media screen and (max-width: 1024px) {
    max-width: none;
    height: 2rem;
  }
`

const ConBox = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const CateBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 1.75rem;
`
const Dim = styled(motion.div)`
  display: none;
  width:100%;
  height:100%;
  position:fixed;
  top: 0;
  left: 0;
  z-index:49;
  background: rgba(0,0,0,0.5);

  @media screen and (max-width: 1024px) {
    display: block;
  }
`
const DimBtn = styled.button`
  position:absolute;
  top:1rem;
  right:2.5rem;
  display:none;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.3rem;
  font-size:1.5rem;
  color: #111;
  
  @media screen and (max-width: 1024px) {
    display: flex;
  }
`

export default function Header() {
  const [navOpen, setNavOpen] = useRecoilState(navOpenState);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <NavSec $navOpen={navOpen}>
        <NavWrap $navOpen={navOpen}>
          <Logo $navOpen={navOpen}>
            <LogoImg $navOpen={navOpen} src={navOpen ? "/src/images/hc_logo_2.svg" : "/src/images/hc_symbol.svg"} />
          </Logo>
          <DimBtn onClick={toggleNav}>
            <i className='xi-close' />
          </DimBtn>
          <ConBox>
            <CateBox>
              <Category />
              <div></div>
            </CateBox>
          </ConBox>
        </NavWrap>
      </NavSec>
      { navOpen && <Dim onClick={toggleNav} />  }
      
    </>
  )
}
