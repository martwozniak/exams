import Link from 'next/link';
import React from 'react';

export default function Settings() {
  return (
    <div className="flex h-screen justify-center bg-slate-950">
      <div className="container flex gap-2">
        <div className="w-1/6">
          <div className="flex flex-col gap-4">
            <div className="b rounded-xl border border-slate-900 p-4 text-slate-200">
              <div className="text-xl font-bold">Ustawienia</div>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2 ">
                    <Link href="#account">
                      <div className="cursor-pointer text-slate-600 transition-all hover:text-slate-200">
                        Konto
                      </div>
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link href="#notifications">
                      <div className="cursor-pointer text-slate-600 transition-all hover:text-slate-200">
                        Powiadomienia
                      </div>
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Link href="#password">
                      <div className="cursor-pointer text-slate-600 transition-all hover:text-slate-200">
                        Zmien haslo
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/6">
          <div className="flex flex-col gap-4">
            <div className="b rounded-xl border border-slate-900 p-4 text-slate-200">
              <div className="text-xl font-bold">Konto</div>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2 ">
                    <div
                      id="account"
                      className="cursor-pointer text-slate-600 transition-all hover:text-slate-200"
                    >
                      Konto
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      id="notifications"
                      className="cursor-pointer text-slate-600 transition-all hover:text-slate-200"
                    >
                      Powiadomienia
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      id="password"
                      className="cursor-pointer text-slate-600 transition-all hover:text-slate-200"
                    >
                      Zmien haslo
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
