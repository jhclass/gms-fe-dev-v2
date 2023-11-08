import { useRecoilState } from 'recoil'
import { isMenuOpenState } from '@/lib/recoilAtoms'
import MenuList from '@/components/MenuList'

interface DropdownMenuProps {
  isOpen: boolean
}

export default function MenuAll() {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenState)

  return (
    <>
      <div className="relative h-full">
        <div
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          className="relative items-center hidden h-full text-base cursor-pointer md:flex lg:flex min-w-[5.5rem]"
        >
          <p
            className={`flex items-center px-2 py-1 rounded-lg bg-primary border-1 border-primary ${
              isMenuOpen ? 'bg-white text-primary' : 'bg-primary text-white'
            }`}
          >
            <span>전체과정</span>
            <i className="align-middle text-xl/none xi-angle-down-min" />
          </p>
        </div>
        <MenuList isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
    </>
  )
}
