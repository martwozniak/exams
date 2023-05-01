import React from 'react'
import { CheckmarkIcon } from 'react-hot-toast'


export default function Login() {
  return (
    <div className='flex items-center min-h-screen flex-col bg-slate-950 text-sm text-slate-200 min-w-screen'>

        <div className='flex items-start justify-center mt-8 container'>
            <div className='container flex flex-row items-center justify-center gap-8'>
     
          
                <div className='w-1/2 xl:max-w-md'>
                 
               
                <div className='border border-slate-800 rounded-xl bg-slate-900 py-8 px-8'>
                <div className='text-xl font-bold'>Login</div> 
                    <form>
                        <div className='flex flex-col gap-4 mt-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='email'>Email</label>
                                <input className='border border-slate-800 rounded-md px-2 py-1 bg-slate-950' type='email' name='email' id='email' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='password'>Password</label>
                                <input className='border border-slate-800 rounded-md px-2 py-1 bg-slate-950' type='password' name='password' id='password' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <button className='bg-emerald-800 font-bold text-slate-50 rounded-md px-2 py-1'>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
              
                <div className='w-1/2 flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <CheckmarkIcon className='inline-block mr-2' />
                        <div className='text-xl font-bold'>Dostep do 300 000 egzaminow</div>
                    </div> 
                    <div className='flex gap-2 items-center'>
                        <CheckmarkIcon className='inline-block mr-2' />
                        <div className='text-xl font-bold'>Dostep do 1 809 010 pytan</div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}