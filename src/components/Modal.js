import { useState } from "react"

export default function Modal({ user }) {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (val) => {
        setIsOpen(val)
    }

    return (
        <>
            <button onClick={() => handleOpen(true)} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Kullanıcı Bilgileri Görüntüle
            </button>

            <div id="defaultModal" hidden={!isOpen} className="fixed top-20 z-50 w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)]">
                <div className="relative w-full max-w-xl max-h-full shadow-lg ">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-90">
                                Kullanıcı : {user.firstName + " " + user.lastName}
                            </h3>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold">Mail :</h3>
                                <p className="text-lg  text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Telefon :</h3>
                                <p className="text-lg  text-gray-500">
                                    {user.phone}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Adres :</h3>
                                <p className="text-lg  text-gray-500">
                                    {user.address}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button type="button" onClick={() => handleOpen(false)} className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5  ">Kapat</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
