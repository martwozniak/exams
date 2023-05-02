import React from 'react';

// TODO: Create variants with every person and every combination
// TODO: Add props to change the text, image, and button text and link
export default function CTA() {
  return (
    <div className="CTA">
      <div className="my-6 flex flex-col justify-center sm:flex-row">
        <div className="container  flex flex-col items-center gap-4 rounded-xl  border border-slate-800 sm:flex-row">
          <div className="mx-8 flex max-w-md flex-col gap-2 gap-2 py-4">
            <span className="text-3xl font-bold">Chcesz więcej?</span>
            <p>
              Dołącz do naszej spolecznosci, aby otrzymywać powiadomienia o
              nowych pytaniach. Zaloz konto juz dzis i miej dostep do statystyk
              oraz podsumowan Twoich egzaminow
            </p>

            <div className="mt-4 flex items-center gap-4">
              <button className="rounded-xl bg-slate-800 px-4 py-2 text-slate-200">
                Zaloz konto
              </button>
              <i>lub</i>
              <button className="rounded-xl px-4 py-2 text-slate-400">
                Zaloguj sie
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col items-end justify-center">
            <img src="/assets/people.png" alt="CTA" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
