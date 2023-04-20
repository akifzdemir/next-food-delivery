import { MdFoodBank } from 'react-icons/md'

export default function Card({ name, address }) {
    return (
        <div
            className="
                flex flex-row h-32 rounded-lg items-center
                w-1/2
                bg-white p-3 shadow-lg
               hover:shadow-2xl
               hover:scale-110
               transition-all
               duration-300
               "
        >
            <div className='w-14 flex items-center justify-center content-center'>
                <div>
                    <MdFoodBank size={"50px"} />
                </div>

            </div>
            <div className="text-center w-full">
                <h3 className='font-semibold text-lg'>{name}</h3>
                <p className='font-light'>
                    {address}
                </p>

            </div>
        </div>
    )
}