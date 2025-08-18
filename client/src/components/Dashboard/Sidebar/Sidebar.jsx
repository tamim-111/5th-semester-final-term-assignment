import { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router'
import logo from '../../../assets/images/logo.svg'
import CustomerSidebar from './CustomerSidebar/CustomerSidebar'
import SellerSidebar from './SellerSidebar/SellerSidebar'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Spinner/LoadingSpinner'
import SidebarLink from './SidebarLink'
import { FaUserCircle } from 'react-icons/fa'

const Sidebar = () => {
    const [isActive, setActive] = useState(false)
    const { role, isLoading } = useRole()

    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/' className='text-xl md:text-2xl font-bold flex items-center gap-1'>
                            <img src={logo} alt='logo' className='w-8 h-8' />
                            <span>MedEasy</span>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center'>
                            <Link to='/' className='text-xl md:text-2xl font-bold flex items-center gap-1'>
                                <img src={logo} alt='logo' className='w-8 h-8' />
                                <span>MedEasy</span>
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {isLoading && <LoadingSpinner></LoadingSpinner>}
                            {role === 'customer' && <CustomerSidebar />}
                            {role === 'seller' && <SellerSidebar />}
                            {role === 'admin' && <AdminSidebar />}
                            {/* Profile Link */}
                            <SidebarLink
                                to='/dashboard/profile'
                                icon={<FaUserCircle />}
                                label='Profile'
                            />

                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
