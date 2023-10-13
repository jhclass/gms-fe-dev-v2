import Link from 'next/link';

interface DropdownMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MenuList({isOpen, setIsOpen}) {
  return (
    <div 
      className={`menuList ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <h5 className="px-2 py-3 font-semibold text-black">근로자</h5>
      <ul>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">파이썬</Link></li>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">react.js</Link></li>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">자바</Link></li>
      </ul>
      <h5 className="px-2 py-3 font-semibold text-black border-t-1 border-slate-400">실업자</h5>
      <ul>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">[과정평가형] 정보처리산업기사</Link></li>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">풀스택 웹개발</Link></li>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">앱개발</Link></li>
        <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-primary hover:text-white">백앤드개발</Link></li>
      </ul>
    </div>
  );
};