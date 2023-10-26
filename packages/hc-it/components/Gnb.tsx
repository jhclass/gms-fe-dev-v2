import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, DropdownSection, PopoverContent, Popover, PopoverTrigger} from "@nextui-org/react";
import MenuAll from "./MenuAll";

export default function Gnb() {
  
  return (
    <>
      <div className="hidden mr-3 md:hidden lg:block">
        <MenuAll />
      </div>
      <ul className="flex items-center w-full px-3 overflow-x-auto lg:px-0 lg:w-auto whitespace-nowrap scroll">
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            ⭐BEST 강의 특별전
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            😍얼리버드할인
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            SNS이벤트
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            리뉴얼EVENT
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
          🔥타임세일
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            EVENT1
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            EVENT2
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            EVENT3
          </Link>
        </li>
        <li className="mx-2">
          <Link color="foreground" href="#" className="py-3 lg:py-0">
            EVENT4
          </Link>
        </li>
      </ul>
    </>
  );
}
