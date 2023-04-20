import { useRouter } from "next/router"
import { useState } from "react"

export default function Home({ cities }) {

  const [formData, setFormData] = useState([])
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/restaurants/${formData.city}`)
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  return (
    <>
      <div className="flex h-screen items-center justify-center w-full">
        <form onSubmit={handleSubmit} className='flex flex-col rounded-2xl justify-center gap-10 shadow-2xl p-10  w-1/2'>
          <select className='p-3 shadow-md rounded-2xl w-full' name='city' onChange={handleChange}>
            <option value="">Şehir</option>
            {cities.map(city => (
              <option key={city._id} value={city._id}>{city.name}</option>
            ))}
          </select>
          <button className='shadow-sm rounded-md p-3 bg-pink-600 text-white' type="submit">Tamamla</button>
        </form>
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

