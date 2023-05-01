import Link from 'next/link'
import React from 'react'

export default function Settings() {
  return (
    <div className='h-screen bg-slate-950 flex justify-center'>
        <div className='container flex gap-2'>

            <div className="w-1/6">
                <div className="flex flex-col gap-4">
                    <div className="border border-slate-900 b text-slate-200 rounded-xl p-4">
                        <div className="text-xl font-bold">Ustawienia</div>
                        <div className="flex text-sm flex-col gap-2 mt-4">
                          <ul className='flex flex-col gap-2'>
                            <li className="flex items-center gap-2 ">
                                <Link href="#account">
                                    <div className="text-slate-600 hover:text-slate-200 transition-all cursor-pointer">Konto</div>
                                </Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <Link href="#notifications">
                                    <div className="text-slate-600 hover:text-slate-200 transition-all cursor-pointer">Powiadomienia</div>
                                </Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <Link href="#password">
                                    <div className="text-slate-600 hover:text-slate-200 transition-all cursor-pointer">Zmien haslo</div>
                                </Link>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-5/6">
                <div className="flex flex-col gap-4">
                    <div className="border border-slate-900 b text-slate-200 rounded-xl p-4">
                        <div className="text-xl font-bold">Konto</div>
                        <div className="flex text-sm flex-col gap-2 mt-4">
                            <ul className='flex flex-col gap-2'>
                                <li className="flex items-center gap-2 ">
                                    <div id="account" className="text-slate-600 hover:text-slate-200 transition-all cursor-pointer">Konto</div>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div id="notifications" className="text-slate-600 hover:text-slate-200 transition-all cursor-pointer">Powiadomienia</div>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div id="password" className="text-slate-600 hover:text-slate-200 transition-all cursor-pointer">Zmien haslo</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}