import { Header } from "@/componenets/Header";
import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <Component {...pageProps} />
    <Toaster />
  </> 
}
