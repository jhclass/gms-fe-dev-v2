import { useRecoilState } from 'recoil';
import { isMenuOpenState } from '@/lib/recoilAtoms';
import MenuList from "@/components/MenuList";

interface DropdownMenuProps {
  isOpen: boolean;
}

export default function MenuAll() {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenState);

  return (
    <>
      <div className="relative">
        <div onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)} className="relative px-4 py-0.5 md:block lg:block hidden hover:opacity-80 subpixel-antialiased font-normal text-white no-underline align-middle transition-opacity bg-primary leading-[2rem] tap-highlight-transparent rounded-medium transition-transform-colors motion-reduce:transition-indigonone">
          전체 메뉴
        </div> 
       <MenuList isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>   
    </>
  );
};