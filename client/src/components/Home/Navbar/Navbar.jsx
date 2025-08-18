import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo.svg'
import Container from '../../container/Container'
import useAuth from '../../../hooks/useAuth'

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState('light')
    const dropdownRef = useRef(null)

    // Apply theme
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme)
    }, [theme])

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="fixed w-full bg-base-100 border-b border-base-300 z-10 shadow-sm">
            <div className="py-4">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-xl md:text-2xl font-bold flex items-center gap-1"
                        >
                            <img src={logo} alt="logo" className="w-8 h-8" />
                            <span>MedEasy</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-6 xl:text-xl">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `${isActive ? 'underline text-[#25A8D6] font-semibold' : ''}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/shop"
                                className={({ isActive }) =>
                                    `${isActive ? 'underline text-[#25A8D6] font-semibold' : ''}`
                                }
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                to="/discounted-products"
                                className={({ isActive }) =>
                                    `${isActive ? 'underline text-[#25A8D6] font-semibold' : ''}`
                                }
                            >
                                Discounted Products
                            </NavLink>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    `${isActive ? 'underline text-[#25A8D6] font-semibold' : ''}`
                                }
                            >
                                Cart
                            </NavLink>
                            {!user && (
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `${isActive ? 'underline text-[#25A8D6] font-semibold' : ''}`
                                    }
                                >
                                    Join Us
                                </NavLink>
                            )}
                        </div>

                        {/* Right Side */}
                        <div className="flex gap-2 lg:gap-4 items-center">
                            {/* Theme Toggle */}
                            <button
                                className="btn btn-ghost btn-circle border border-neutral-200 transition"
                                onClick={handleThemeToggle}
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>

                            {/* Profile / Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2 border border-neutral-200 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
                                >
                                    <AiOutlineMenu />
                                    <img
                                        className="rounded-full"
                                        referrerPolicy="no-referrer"
                                        src={user?.photoURL || avatarImg}
                                        alt="profile"
                                        height="30"
                                        width="30"
                                    />
                                </div>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute rounded-xl shadow-md w-[60vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm z-50">
                                        <div className="flex flex-col cursor-pointer text-black">
                                            {/* Mobile Nav Links */}
                                            <div className="md:hidden flex flex-col">
                                                <NavLink
                                                    to="/"
                                                    className={({ isActive }) =>
                                                        `px-4 py-3 hover:bg-neutral-100 transition font-semibold ${isActive
                                                            ? 'underline text-[#25A8D6]'
                                                            : ''
                                                        }`
                                                    }
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Home
                                                </NavLink>
                                                <NavLink
                                                    to="/shop"
                                                    className={({ isActive }) =>
                                                        `px-4 py-3 hover:bg-neutral-100 transition font-semibold ${isActive
                                                            ? 'underline text-[#25A8D6]'
                                                            : ''
                                                        }`
                                                    }
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Shop
                                                </NavLink>
                                                <NavLink
                                                    to="/discounted-products"
                                                    className={({ isActive }) =>
                                                        `px-4 py-3 hover:bg-neutral-100 transition font-semibold ${isActive
                                                            ? 'underline text-[#25A8D6]'
                                                            : ''
                                                        }`
                                                    }
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Discounted Products
                                                </NavLink>
                                                <NavLink
                                                    to="/cart"
                                                    className={({ isActive }) =>
                                                        `px-4 py-3 hover:bg-neutral-100 transition font-semibold ${isActive
                                                            ? 'underline text-[#25A8D6]'
                                                            : ''
                                                        }`
                                                    }
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Cart
                                                </NavLink>
                                                {!user && (
                                                    <NavLink
                                                        to="/login"
                                                        className={({ isActive }) =>
                                                            `px-4 py-3 hover:bg-neutral-100 transition font-semibold ${isActive
                                                                ? 'underline text-[#25A8D6]'
                                                                : ''
                                                            }`
                                                        }
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Join Us
                                                    </NavLink>
                                                )}
                                            </div>

                                            {/* Auth Links */}
                                            {user ? (
                                                <>
                                                    <Link
                                                        to="/update-profile"
                                                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Update Profile
                                                    </Link>
                                                    <Link
                                                        to="/dashboard"
                                                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                    <div
                                                        onClick={() => {
                                                            setIsOpen(false)
                                                            logOut()
                                                        }}
                                                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                                                    >
                                                        Logout
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="px-4 py-3 text-xs text-red-400">
                                                    Please Login to see below features
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar
