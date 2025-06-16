import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {HiMiniBars3CenterLeft} from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import {IoSearchOutline} from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiShoppingCart } from "react-icons/hi2";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
 

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Orders', href: '/orders' },
    { name: 'Cart Page', href: '/cart' },
    { name: 'Checkout', href: '/checkout' }
];

const Navbar = () => {
    const { currentUser,logoutUser } = useAuth();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const dropdownRef = useRef(null);



    const handleLogOut = () => {
        console.log("clicked")
        logoutUser()
        setIsDropDownOpen(false);
    }


    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


    const cartItems = useSelector((state) => state.cart.cartItems);
    

    return (    
        <header className="max-w-screen-2xl mx-auto px-14 py-6">
            <nav className="flex justify-between items-center">
                <div className="flex items-center gap-10 md:gap-20">
                    <Link to="/">
                    <HiMiniBars3CenterLeft className="size-6"/>
                    </Link>

                    <div className="flex items-center gap-4 bg-[#EAEAEA] w-full py-1 md:p-2 rounded-md">
                        <IoSearchOutline/>
                        <input type="text" placeholder="Search... " className="focus:outline-none" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div ref={dropdownRef}>
                        {
                            currentUser ? <>
                            
                            <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                            <img src={avatarImg} alt="avatar" className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-blue-500" />
                            </button> 
                            
                            {isDropDownOpen && (
                                <div className=" absolute right-30 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                    <ul className="py-2">
                                        {navigation.map((item) => (
                                            <li key={item.name} onClick={() => setIsDropDownOpen(false)}>
                                                <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <button className="cursor-pointer text-left block px-4 py-2 text-sm hover:bg-gray-100 w-full"
                                            onClick={handleLogOut}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            </>
                            :
                            
                            
                            <Link to="/login" className="flex items-center gap-2">
                             <HiOutlineUser className="size-6 text-grey-500 cursor-pointer" />
                             </Link>
                        }
                    </div>
                   
                   
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6 text-grey-500 cursor-pointer" />
                    </button>


                    <Link to="/cart" className="bg-[#FFCE1A] sm:px-6 py-2 gap-4 flex items-center justify-between rounded-sm" >
                        <HiShoppingCart className="size-6 text-grey-500 cursor-pointer" />
                        {cartItems.length > 0 ?
                        <span className="text-gray-800 font-semibold">
                            {cartItems.length}
                        </span>
                        :
                        <span className="text-gray-800 font-semibold">
                            0
                        </span>
                        }
                    </Link>
                </div>
            </nav>

        </header>
    );
}
export default Navbar;

