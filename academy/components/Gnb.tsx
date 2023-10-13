import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, DropdownSection, PopoverContent, Popover, PopoverTrigger} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <NavbarContent justify="start" className="mr-4 grow-0">

      <Popover placement="bottom">
        <PopoverTrigger>
          <Button className="text-white bg-indigo-600">전체메뉴보기</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <h5 className="px-2 py-3 font-semibold text-black">근로자</h5>
            <ul>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">파이썬</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">react.js</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">자바</Link></li>
            </ul>
            <h5 className="px-2 py-3 font-semibold text-black border-t-1 border-slate-400">실업자</h5>
            <ul>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">[과정평가형] 정보처리산업기사</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">풀스택 웹개발</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">앱개발</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">백앤드개발</Link></li>
            </ul>
            </div>
        </PopoverContent>
      </Popover>

        
        {/* <div className="relative hover:opacity-80 subpixel-antialiased font-normal text-white no-underline align-middle transition-opacity bg-indigo-600 leading-[40px] menu tap-highlight-transparent px-unit-4 min-w-unit-20 h-unit-10 rounded-medium transition-transform-colors motion-reduce:transition-none">
          전체메뉴보기
          <div className="menu_drop absolute left-0 py-3 bg-white top-[40px] w-[260px]">
            <h5 className="px-2 py-3 font-semibold text-black">근로자</h5>
            <ul>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">파이썬</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">react.js</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">자바</Link></li>
            </ul>
            <h5 className="px-2 py-3 font-semibold text-black border-t-1 border-slate-400">실업자</h5>
            <ul>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">[과정평가형] 정보처리산업기사</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">풀스택 웹개발</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">앱개발</Link></li>
              <li><Link href="" className="inline-block w-full px-4 py-3 tracking-tight text-black hover:bg-indigo-500 hover:text-white">백앤드개발</Link></li>
            </ul>
          </div>
        </div>*/}
        <div className="flex items-center justify-center">
          <NavbarItem className="mr-4">
            <Link color="foreground" href="#">
              근로자
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              실업자
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </>
  );
}
