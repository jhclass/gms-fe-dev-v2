import {Navbar, NavbarBrand, NavbarContent, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import TopBnr from "@/components/TopBnr";

export default function Header() {
    return (
      <>
        <TopBnr/>
        <Navbar isBordered classNames={{
        base: "max-w-[1440px] m-auto",
        wrapper:"max-w-[1440px]"
        }}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden font-bold sm:block text-inherit">
            LOGO | HighClass
          </p>
        </NavbarBrand>
       </NavbarContent>

      <NavbarContent as="div" className="items-center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<i className="xi-search"/>}
          type="search"
        />
        </NavbarContent>
        <NavbarContent justify="end">
            <Link href="#" size="sm" className="mr-1.5">
                Log In
            </Link>
            <Button
                isExternal
                href="https://github.com/nextui-org/nextui"
                as={Link}
                color="primary"
                variant="solid"
            >
            Sign up
            </Button>

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
    </Navbar>
      </>
    );
  }