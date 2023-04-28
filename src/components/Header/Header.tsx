import Link from 'next/link'
import React from 'react'
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="header flex items-center justify-center text-whit py-4">
        
        <div className="container flex justify-between text-slate-100 px-4">
          <div>
            <Link href="/">
              <Image src="/assets/logo.svg" className="w-24 h-12" width={200} height={100} alt="Site logo"/>
            </Link>
          </div>

          <div className="flex gap-4 items-center text-xs">
            <div className="cursor-pointer">Test 1 pytanie</div>
            <div className="cursor-pointer">Test 15 pytan</div>
            <div className="cursor-pointer">Test 100 pytan</div>
            <button className="bg-slate-900 text-slate-50 px-4 py-2 rounded-xl" >Zaloguj sie</button>
          </div>
        </div>
      </div>
    </>
  )
}