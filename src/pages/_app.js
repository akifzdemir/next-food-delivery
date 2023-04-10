import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer
        position='bottom-center'

      />
    </AuthProvider>
  )

}
