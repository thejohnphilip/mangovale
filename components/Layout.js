// this page is for layout of the admin page
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

// for the font 
const inter = Inter({ subsets: ["latin"] });

// layout 
export default function Layout({children}) {
  //session
  const { data: session } = useSession();
  if(!session)
  {

    //login page 
    return (
      <div className="bg-green-600 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')}className="bg-white p-2 px-4 rounded -lg">Login with Google</button>
        </div>
      </div>
    );
  }

  // if the session is true
  return (
    <div className="bg-green-600 min-h-screen flex">
      <Nav/>
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
    </div>
    
  )
}

