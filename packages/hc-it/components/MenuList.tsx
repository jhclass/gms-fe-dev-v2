import Link from 'next/link'

interface DropdownMenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function MenuList({ isOpen, setIsOpen }) {
  return (
    <>
      <div
        className={`menuList ${isOpen ? 'open' : ''} py-5 w-[50rem]`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="w-1/2 px-5 ">
          <h5 className="px-2 py-3 mb-3 text-lg font-semibold text-black border-b-1">
            그래픽
          </h5>
          <ul>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/2`}
                className="inline-block w-full px-4 py-2 tracking-tight text-black hover:text-primary"
              >
                웹툰
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                이모티콘
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                컴퓨터그래픽스운용기능사
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                웹디자인기능사
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                OA
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                실내건축
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                영상편집
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                포토샵(단기)
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                [과정평가형] 실내건축산업기사
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                광고홍보 영상편집
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                디지털디자인 영상편집
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                GTQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/2 px-5 border-l-1 border-zinc-300">
          <h5 className="px-2 py-3 mb-3 text-lg font-semibold text-black border-b-1">
            IT
          </h5>
          <ul>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                파이썬
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                react.js
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag2 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                자바
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                [과정평가형] 정보처리산업기사
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                풀스택 웹개발
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                앱개발
              </Link>
            </li>
            <li className="relative after:w-1 after:h-1 after:bg-flag1 after:rounded-full after:absolute after:left-0 after:top-[50%] after:mt-[-0.125rem]">
              <Link
                href={`/detail/1`}
                className="inline-block w-full px-4 py-3 tracking-tight text-black hover:text-primary"
              >
                백앤드개발
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
