import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { HiMenu } from 'react-icons/hi';
import { ChevronDownIcon } from 'lucide-react';
import { IoCloseCircle } from 'react-icons/io5';
import { Link, useLocation } from 'react-router';
import { MdCategory } from 'react-icons/md';
import { navItems, productsItemNav } from '../nav.config';

export default function Header() {
  const { pathname } = useLocation();

  const isActive = (to: string, currentPath: string) => {
    return currentPath === to;
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex w-full items-center justify-between p-4 shadow-md md:px-6"
      >
        {/* Logo */}
        <div className="flex md:flex-1">
          <Link to="/" className="-m-1.5 flex items-center gap-2">
            <MdCategory className="h-10 w-auto text-black text-primary" />
          </Link>
        </div>

        {/* Items for larger screens */}
        <div className="hidden md:flex md:gap-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`navLink ${isActive(item.to, pathname) ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <button className="navLink flex items-center gap-1">
                Products
                <ChevronDownIcon className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="rounded-lg bg-white p-4 shadow-md">
              <div className="grid gap-4">
                {productsItemNav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`navLink ${isActive(item.to, pathname) ? 'active font-bold' : ''}`}
                  >
                    <span className="font-semibold">{item.name}</span>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Buttons for larger screens */}
        <div className="hidden items-center gap-2 md:flex md:flex-1 md:justify-end">
          <Link to="/signIn" className="myPrimaryOutlineBtn">
            Sign In
          </Link>
          <Link to="/signUp" className="myPrimaryBtn">
            Create Account
          </Link>
        </div>

        {/* Menu for smaller screens */}
        <div className="flex md:hidden">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <HiMenu className="h-6 w-6" aria-hidden="true" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-screen w-full overflow-y-auto bg-white shadow-lg">
              <DrawerHeader className="flex items-center justify-center border-b p-4">
                <div className="w-[90%]">
                  <DrawerTitle className="text-lg font-bold text-gray-900">
                    Menu
                  </DrawerTitle>
                  <DrawerDescription className="text-sm text-gray-500">
                    Navigate through the application.
                  </DrawerDescription>
                </div>
                <DrawerClose asChild className="w-[10%]">
                  <button className="rounded-md p-2 text-gray-700">
                    <IoCloseCircle className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DrawerClose>
              </DrawerHeader>
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  to="#"
                  className="-m-1.5 flex items-center gap-2 rounded-lg bg-white p-4 shadow-md"
                >
                  <MdCategory className="mx-auto h-16 w-auto text-black text-primary" />
                </Link>
                {navItems.map((item) => (
                  <DrawerClose key={item.name} asChild>
                    <Link
                      to={item.to}
                      className={`navLink rounded-lg bg-white px-4 py-2 shadow-md ${isActive(item.to, pathname) ? 'active' : ''}`}
                    >
                      {item.name}
                    </Link>
                  </DrawerClose>
                ))}
              </div>
              <DrawerFooter className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <DrawerClose asChild>
                    <Link to="/signIn" className="myPrimaryOutlineBtn">
                      Sign In
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/signUp" className="myPrimaryBtn">
                      Create Account
                    </Link>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
