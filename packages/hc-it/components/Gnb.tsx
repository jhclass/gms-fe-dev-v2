import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, DropdownSection, PopoverContent, Popover, PopoverTrigger} from "@nextui-org/react";
import MenuAll from "./MenuAll";

export default function Gnb() {
  
  return (
    <>
      <div className="hidden mr-3 md:hidden lg:block">
        <MenuAll />
      </div>
      <ul className="flex items-center justify-center">
        <li className="mr-4">
          <Link color="foreground" href="#">
            근로자
          </Link>
        </li>
        <li>
          <Link color="foreground" href="#">
            실업자
          </Link>
        </li>
      </ul>
    </>
  );
}
