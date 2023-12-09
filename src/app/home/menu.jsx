"use client";
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
                    <h1 className="text-4xl font-bold flex"><FiBox className="mr-2" /> SurveryBlock</h1>
                </div>
                <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
                    <Link href="/admin/dashboard"><label className={(!pathName.includes("/admin/dashboard") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiHome /> Dashboard</label></Link>
                    <Link href="/admin/bundles"><label className={(!pathName.includes("/admin/bundles") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiBriefcase /> Bundles</label></Link>
                    <Link href="/admin/months"><label className={(!pathName.includes("/admin/months") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiCalendar /> Months</label></Link>
                    <Link href="/admin/course-categories"><label className={(!pathName.includes("/admin/course-categories") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiBookmark /> Categories</label></Link>
                    <Link href="/admin/courses"><label className={(!pathName.includes("/admin/courses") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiBookOpen /> Courses</label></Link>
                    <Link href="/admin/modules"><label className={(!pathName.includes("/admin/modules") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiBook /> Modules</label></Link>
                    <Link href="/admin/lessons"><label className={(!pathName.includes("/admin/lessons") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiPlayCircle /> Lessons</label></Link>
                    <Link href="/admin/materials"><label className={(!pathName.includes("/admin/materials") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiFileText /> Study Materials</label></Link>
                    <Link href="/admin/quiz"><label className={(!pathName.includes("/admin/quiz") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiHelpCircle /> Quiz</label></Link>
                    <Link href="/admin/users"><label className={(!pathName.includes("/admin/users") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiUsers /> Users</label></Link>
                    <Link href="/admin/purchases"><label className={(!pathName.includes("/admin/purchases") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiDollarSign /> Purchases</label></Link>
                    <Link href="/admin/settings"><label className={(!pathName.includes("/admin/settings") ? "btn-ghost " : "") + 'btn w-full justify-start normal-case'} onClick={() => { }}><FiSettings /> Settings</label></Link>
                </div>
                <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center mt-2 hover:bg-base-200 p-2 rounded-lg'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center'>
                            <div className="avatar placeholder mr-2">
                                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                                    <span><FiUser /></span>
                                </div>
                            </div>
                            <p className='font-semibold'>Admin</p>
                        </div>
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
