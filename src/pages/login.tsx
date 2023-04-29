import React from 'react'


export default function Login() {
  return (
    <div className='flex items-center justify-center min-h-screen flex-col bg-slate-950 text-sm text-slate-200 min-w-screen'>

        <div className='flex items-center justify-center'>
            <div className='container flex flex-col items-center gap-8'>
                <div>
                    <img src="/assets/logo.svg" className="w-24 h-12" width={200} height={100} alt="Site logo"/>
                </div>
                <div>
                    Login 
                </div>
            </div>
        </div>
    </div>
  )
}