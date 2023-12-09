"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBook, FiBookOpen, FiBookmark, FiBox, FiBriefcase, FiCalendar, FiDollarSign, FiFileText, FiHelpCircle, FiHome, FiLogOut, FiMoreHorizontal, FiPlayCircle, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { ToastContainer } from 'react-toastify';

export default function Menu({ children }) {
    const pathName = usePathname();

    return (
        <main className="flex bg-base-100 h-screen w-screen p-2 max-sm:p-0">
            {/* Sidebar */}
            <div className={'flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md'}>
                <div className="flex justify-between items-center max-sm:mb-4">
                    <h1 className="text-xl font-bold flex items-center"><FiBox className="mr-2" /> SurveryBlock</h1>
                </div>
                <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
                    <Link href="/admin/dashboard"><label className={(!pathName.includes("/admin/dashboard") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiHome /> Dashboard</label></Link>
                    <Link href="/admin/bundles"><label className={(!pathName.includes("/admin/bundles") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiBriefcase /> Bundles</label></Link>
                </div>
                <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center mt-2 hover:bg-base-200 p-2 rounded-lg'>
                    <div className='flex items-center justify-between w-full'>
                        <ConnectButton/>
                        <FiMoreHorizontal />
                    </div>  
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
                        {/* <label htmlFor='settings_modal'><li className='flex'><p><FiSettings />Settings</p></li></label>
                        <Link href="/shop"><label><li className='flex'><p><FiShoppingCart />Shop</p></li></label></Link> */}
                        {/* <hr className='my-2' /> */}
                        <li className='flex' onClick={() => {
                            localStorage.clear()
                            window.location.href = "/login";
                        }}><p><FiLogOut className="text-red-600" />Logout</p></li>
                    </ul>
                </div>
            </div>
            {/* Main */}
            <div className='flex flex-col items-center justify-center ml-2 p-5 border-base-300 border-[1px] w-full h-full rounded-lg 2xl:items-center max-sm:ml-0 max-sm:border-none max-sm:p-2 max-sm:items-start max-sm:justify-start'>
                {children}
            </div>
            <ToastContainer />
        </main >
    )
}
