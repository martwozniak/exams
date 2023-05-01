import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { MdOutlineDiamond } from 'react-icons/md';

export default function Header() {
  //const [session, loading] = useSession();
  const [isLogged, setIsLogged] = React.useState(true)
  return (
    <>
      <div className="header flex items-center justify-center text-whit py-4 bg-slate-950">
        
        <div className="container flex flex-col sm:flex-row justify-between text-slate-100 px-4">
          <div>
            <Link href="/">
              <Image src="/assets/logo.svg" className="w-24 h-12" width={200} height={100} alt="Site logo"/>
            </Link>
          </div>

          <div className="flex gap-2 sm:gap-4 items-center text-xs transition-all text-slate-400 ">
            <Link href="/1"><div className="cursor-pointer transition-all hover:text-slate-50">Test 1 pytanie</div></Link>
            <Link href="/15"><div className="cursor-pointer transition-all hover:text-slate-50">Test 15 pytan</div></Link>
            <Link href="/40"> <div className="cursor-pointer transition-all hover:text-slate-50">Test 40 pytan</div></Link>
         { isLogged ? <>
          <div>
          <div className='flex gap-2 items-center text-emerald-600'>
            <MdOutlineDiamond className='text-xl'/> 
            <p className="text-emerald-600">0</p>
          </div>
         
          </div>
          <div className='group relative'>
          <div className="cursor-pointer flex items-center gap-4 transition-all bg-slate-900 py-2 px-4 rounded-xl hover:text-slate-50">
            <Link href="/profile">Profil</Link>
            <img src='https://avatars.githubusercontent.com/u/7525670?v=4' className="w-8 h-8 rounded-full" alt="User avatar"/>
          </div>
   
          <div className="hidden absolute group-hover:flex bg-slate-950 border border-slate-800 rounded-xl top-50 mt-1 right-0 w-full px-4 py-4">
            <div className="flex flex-col gap-4">
              <Link href="/profile" className='transition-all hover:text-slate-50'>Profile</Link>
              <Link href="/statistics" className='transition-all hover:text-slate-50'>Statistics</Link>
              <Link href="/settings" className='transition-all hover:text-slate-50'>Settings</Link>
              <Link href="/logout" className='transition-all hover:text-slate-50'>Log out</Link>
            </div>
          </div>
 

          </div>
         </> :
          <button className="bg-slate-900 text-slate-100 px-4 py-2 rounded-xl transition-all hover:bg-slate-800 hover:text-slate-50" >Zaloguj sie</button>
          }
          </div>
        </div>
      </div>
    </>
  )
}