import AuthContext from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext } from 'react'
import { BsPersonCircle } from 'react-icons/bs'

export default function Navbar() {
    const { auth, logout, user } = useContext(AuthContext)
    return (
        <div>
            <header className='
            fixed flex flex-row w-full
             bg-white
             justify-between
             px-28
             top-0
             border-b border-gray-200 
             items-center
             h-16
             '>
                <Link href={'/'}><h1 className='font-semibold'>Ana Sayfa</h1></Link>
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
                                    <Link href={"/orders"}><button>Siparişlerim</button></Link>
                                    <Link href={"/cart"}><button>Sepetim</button></Link>
                                    {
                                        user.role === "restaurantOwner" &&
                                        <>
                                            <Link href={"/myRestaurants"}><button>Restoranlarım</button></Link>
                                            <Link href={"/addRestaurant"}><button>Restoran ekle</button></Link>
                                        </>
                                    }
                                    <BsPersonCircle className="w-10 h-10 rounded-full" />
                                    <div className="font-medium ">
                                        <div>{user.userName}</div>
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
