import React from 'react';
import { CheckmarkIcon } from 'react-hot-toast';

export default function Login() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center bg-slate-950 text-sm text-slate-200">
      <div className="container mt-8 flex items-start justify-center">
        <div className="container flex flex-row items-center justify-center gap-8">
          <div className="w-1/2 xl:max-w-md">
            <div className="rounded-xl border border-slate-800 bg-slate-900 px-8 py-8">
              <div className="text-xl font-bold">Login</div>
              <form>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1"
                      type="email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                      className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1"
                      type="password"
                      name="password"
                      id="password"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="rounded-md bg-emerald-800 px-2 py-1 font-bold text-slate-50">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex w-1/2 flex-col gap-2">
            <div className="flex items-center gap-2">
              <CheckmarkIcon className="mr-2 inline-block" />
              <div className="text-xl font-bold">
                Dostep do 300 000 egzaminow
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckmarkIcon className="mr-2 inline-block" />
              <div className="text-xl font-bold">Dostep do 1 809 010 pytan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
