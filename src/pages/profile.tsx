export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="flex items-center justify-center">
        <div className="container flex flex-row items-center gap-8">
          <div className="mt-8 w-1/6">
            <div className="rounded-xl border border-slate-800 px-8 py-4">
              Belka profilu
            </div>
          </div>
          <div className="mt-8 w-5/6">
            <div className="rounded-xl border border-slate-800 px-8 py-4">
              Zawartosc profilu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
