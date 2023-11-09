import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Aside from '@/components/Aside'
import { useRecoilState } from 'recoil'
import { moMenuOpenState } from '@/lib/recoilAtoms'

export default function Layout({ children }) {
  const [moMenuOpen] = useRecoilState(moMenuOpenState)
  return (
    <>
      <div className={`${moMenuOpen ? 'overflow:hidden' : ''}`}>
        <Header />
        {children}
        <Footer />
        <Aside />
      </div>
    </>
  )
}
