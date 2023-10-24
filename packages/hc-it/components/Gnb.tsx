import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, DropdownSection, PopoverContent, Popover, PopoverTrigger} from "@nextui-org/react";
import MenuAll from "./MenuAll";

export default function Gnb() {
  return (
    <>
      <NavbarContent justify="start" className="mr-4 grow-0">
        <div className="hidden md:hidden lg:block xl:block ">
          <MenuAll />
        </div>
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
    </>
  );
}
