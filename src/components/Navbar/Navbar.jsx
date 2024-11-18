import "../../index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DropdownCart from "./DropdownCart";
import DropdownAccount from "./DropdownAccount";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import DarkModeToggle from "../DarkModeToggle";
import { ReactComponent as MotorcycleIcon } from "../../assets/motorcycle.svg";

export default function Navbar() {
  const { auth } = useAuth();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
    setCartDropdownOpen(false);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
    setAccountDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setAccountDropdownOpen(false);
    setCartDropdownOpen(false);
  };

  return (
    <>
      <nav id="navbar" className="w-[100vw] h-[12.5vh] relative z-[100]">
        <div className="headings flex flex-col w-full h-full place-content-center place-items-center">
          <Link to="">
            <div id="logo icon">
              <MotorcycleIcon  style={{ fill: 'var(--logo-color)' }}/>
            </div>
          </Link>
          <div className="flex flex-row">
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 h-full place-items-center">
              <li className="flex items-center justify-center">
                <NavLink
                  id="title"
                  to="products"
                  onClick={() => {
                    closeAllDropdowns();
                  }}
                >
                  <h2 className="text-3xl">Products</h2>
                </NavLink>
              </li>
            </ul>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 h-full place-items-center">
              <li className="flex items-center justify-center">
                <NavLink
                  id="title"
                  to="brands"
                  onClick={() => {
                    closeAllDropdowns();
                  }}
                >
                  <h2 className="text-3xl">Brands</h2>
                </NavLink>
              </li>
            </ul>
            <ul className="hidden md:flex px-4 mx-auto font-heading space-x-12 h-full place-items-center">
              <li className="flex items-center justify-center">
                <NavLink
                  id="title"
                  to="products"
                  onClick={() => {
                    closeAllDropdowns();
                  }}
                >
                  <h2 className="text-3xl">Example 2</h2>
                </NavLink>
              </li>
            </ul>
            <ul className="hidden md:flex px-4 mx-auto font-heading space-x-12 h-full place-items-center">
              <div className="flex items-center relative right-0 space-x-5 mx-auto">
                <DarkModeToggle />
        
                  <div className="flex flex-row items-center">
                    <li className="mr-3">
                      <div
                        className={
                          cartDropdownOpen
                            ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1"
                            : "non-active-class text-xl p-1"
                        }
                        onClick={()=>toggleCartDropdown()}
                      >
                        <DropdownCart
                          isOpen={cartDropdownOpen}
                          onClose={() => setCartDropdownOpen(false)}
                        />
                      </div>
                    </li>
                    <li>
                      <div 
                       className={
                        accountDropdownOpen
                          ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1"
                          : "non-active-class text-xl p-1"
                      }
                      onClick={toggleAccountDropdown}>
                        <DropdownAccount
                          isOpen={accountDropdownOpen}
                          onClose={() => setAccountDropdownOpen(false)}
                        />
                        <Link to="logout"></Link>
                      </div>
                    </li>
                  </div>
       
                  
              </div>
            </ul>
          
          </div>
        </div>
      </nav>
    </>
  );
}
