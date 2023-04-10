import AuthContext from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext } from 'react'
import { BsPersonCircle } from 'react-icons/bs'

export default function Navbar() {
    const { auth, logout } = useContext(AuthContext)
    return (
        <div>
            <header className='
            fixed flex flex-row w-full
             bg-white
             justify-between
             px-28
             border-b border-gray-200 
             items-center
             h-16
             '>
                <h1 className='font-semibold'>Başlık</h1>
                <ul className='flex flex-row items-center gap-10'>
                    {
                        !auth
                            ?
                            <> <li>
                                <Link href={'/login'}> <button className='bg-pink-600 text-white p-2 rounded-md'>Giriş yap</button></Link>

                            </li>
                                <li>
                                    <Link href={"/register"}><button>Kayıt ol</button></Link>
                                </li>
                            </>
                            :
                            <>
                                <div className="flex items-center space-x-4">
                                    <BsPersonCircle className="w-10 h-10 rounded-full" />
                                    <div className="font-medium ">
                                        <div>Jese Leos</div>
                                        <button onClick={logout} className="text-sm text-gray-500 dark:text-gray-400">Çıkış yap</button>
                                    </div>
                                </div>
                            </>
                    }

                </ul>
            </header>
        </div>
    )
}
