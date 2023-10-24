import {Navbar, NavbarBrand, NavbarContent, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarItem} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import TopBnr from "@/components/main/TopBnr";
import Gnb from "@/components/Gnb";

export default function Header() {
    return (
      <>
        <TopBnr/>
        <Navbar
          id="header"
          isBordered 
          classNames={{
          base: "max-w-full m-auto px-0",
          wrapper:"max-w-full flex-col px-0",
          }}
          height="auto"
        >
          <div className="w-full bg-[#27272E]">
            <ul className="flex items-center m-auto lg:w-full">
              <li className="min-w-[70px] cursor-pointer border-x-1 border-slate-400 bg-primary"><Link className="block w-full h-full text-center px-2 py-1.5 text-white">IT</Link></li>
              <li className="min-w-[70px] cursor-pointer border-r-1 border-slate-400"><Link className="block w-full h-full text-center px-2 py-1.5 text-white">그래픽</Link></li>
            </ul>
          </div>
          <div className="max-w-[1440px] flex items-center justify-center w-full">
            <NavbarContent justify="start">
              <NavbarBrand className="mr-4 grow-0">
                {/* <p className="hidden font-bold sm:block text-inherit">
                   <img src="/src/images/logo_w.png"/>
                </p> */}
                <p className="w-[10rem]"><img src="/src/images/logo.png"/></p>
              </NavbarBrand>
              <div className="w-[300px]">
                <Input
                  classNames={{
                    base: "max-w-full h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  fullWidth
                  placeholder="검색어를 입력해주세요"
                  size="sm"
                  startContent={<i className="xi-search"/>}
                  type="search"
                />
              </div>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                <Link href="#"  className="text-primary">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} href="#" variant="flat" className="text-white bg-primary">
                  Sign Up
                </Button>
              </NavbarItem>

              {/* <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="gap-2 h-14">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </NavbarContent>
          </div>
          <div className="max-w-[1440px] pb-3 flex items-center justify-center w-full grow-0">
            <Gnb />
          </div>
        </Navbar>
      </>
    );
  }