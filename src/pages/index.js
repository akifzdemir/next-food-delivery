import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Home({ cities }) {

  const [formData, setFormData] = useState([])
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.city) {
      router.push(`/restaurants/${formData.city}`)
    } else {
      toast.error("Şehir Seçiniz")
    }
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  return (
    <>
      <div className="flex flex-row justify-evenly items-center px-10">
        <div className="hidden md:flex items-center justify-center h-screen p-10">
          <Image
            src={"/undraw_map_re_60yf.svg"}
            width={500}
            height={500}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-10 h-screen items-center  justify-center ">
          <h1 className="text-4xl text-center font-bold">Şehrinizdeki Restororanları görmek için <br /> şehir seçin: </h1>
          <form onSubmit={handleSubmit} className='flex flex-col rounded-2xl justify-center gap-10 shadow-2xl p-10  w-full'>
            <select className='p-3 shadow-md rounded-2xl w-full' name='city' onChange={handleChange}>
              <option value="">Şehir</option>
              {cities.map(city => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
            <button className='shadow-sm rounded-md w-1/2 self-center p-3 bg-pink-600 text-white' type="submit">Göster</button>
          </form>
        </div>
      </div>
    </>
  )
}
export async function getStaticProps() {
  const response = await fetch('http:localhost:3000/api/city')
  const data = await response.json()
  const cities = data.data
  return {
    props: {
      cities
    }
  }
}

