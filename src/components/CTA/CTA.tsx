import React from 'react'

// TODO: Create variants with every person and every combination
// TODO: Add props to change the text, image, and button text and link
export default function CTA() {
  return (
         <div className='CTA'>
        <div className='flex justify-center my-6'>
          <div className='container border border-slate-800 rounded-xl  flex gap-4 items-center'>
            <div className='max-w-md flex gap-2 flex-col gap-2 mx-8 py-4'>
              <span className='text-3xl font-bold'>Chcesz więcej?</span>
              <p>Dołącz do naszej spolecznosci, aby otrzymywać powiadomienia o nowych pytaniach. Zaloz konto juz dzis i miej dostep do statystyk oraz podsumowan Twoich egzaminow</p>
              
            <div className='flex gap-4 items-center mt-4'>
              <button className='bg-slate-800 text-slate-200 px-4 py-2 rounded-xl'>Zaloz konto</button>
              <i>lub</i>
              <button className='text-slate-400 px-4 py-2 rounded-xl'>Zaloguj sie</button>
            </div>

            </div>
            <div className='flex justify-center w-full'>
              <img src="/assets/people.png" alt="CTA" className=''/>
            </div>
        </div>
      </div>
    </div>
  );
}