import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown, DropdownSection, PopoverContent, Popover, PopoverTrigger} from "@nextui-org/react";
import MenuAll from "./MenuAll";

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
        <MenuAll />
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
