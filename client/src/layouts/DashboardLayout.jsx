import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import { Helmet } from 'react-helmet'

const DashboardLayout = () => {
    return (
        <>
            <Helmet><title>MedEasy | DashBoard</title></Helmet>
            <div className='relative min-h-screen md:flex'>
                <Sidebar />
                <div className='flex-1  md:ml-64'>
                    <div className='p-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
