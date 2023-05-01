
export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
        <div className="flex items-center justify-center">
            <div className="container flex flex-row items-center gap-8">
                <div className="w-1/6 mt-8">
                    <div className="border border-slate-800 py-4 px-8 rounded-xl">
                        Belka profilu
                    </div>
                </div>
                <div className="w-5/6 mt-8">
                    <div className="border border-slate-800 py-4 px-8 rounded-xl">
                        Zawartosc profilu
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}