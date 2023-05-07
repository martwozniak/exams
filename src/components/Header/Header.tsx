import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineDiamond } from 'react-icons/md';

export default function Header() {
  //const [session, loading] = useSession();
  //const [isLogged, setIsLogged] = React.useState(true);
  const isLogged = true;

  return (
    <>
      <div className="header text-whit flex items-center justify-center bg-slate-950 py-4">
        <div className="container flex flex-col justify-between px-4 text-slate-100 sm:flex-row">
          <div>
            <Link href={'/'} as={'/'} replace passHref>
              <Image
                src="/assets/logo.svg"
                className="h-12 w-24"
                width={200}
                height={100}
                alt="Site logo"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 transition-all sm:gap-4 ">
            <Link href="/exams">
              <div className="cursor-pointer transition-all hover:text-slate-50">
                Egzaminy
              </div>
            </Link>
            <Link href="/1">
              <div className="cursor-pointer transition-all hover:text-slate-50">
                Test 1 pytanie
              </div>
            </Link>
            {isLogged ? (
              <>
                <div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <MdOutlineDiamond className="text-xl" />
                    <p className="text-emerald-600">0</p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="flex cursor-pointer items-center gap-4 rounded-xl bg-slate-900 px-4 py-2 transition-all hover:text-slate-50">
                    <Link href="/profile">Profil</Link>
                    <img
                      src="https://avatars.githubusercontent.com/u/7525670?v=4"
                      className="h-8 w-8 rounded-full"
                      alt="User avatar"
                    />
                  </div>

                  <div className="top-50 absolute right-0 hidden w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-4 group-hover:flex">
                    <div className="flex flex-col gap-4">
                      <Link
                        href="/profile"
                        className="transition-all hover:text-slate-50"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/statistics"
                        className="transition-all hover:text-slate-50"
                      >
                        Statistics
                      </Link>
                      <Link
                        href="/settings"
                        className="transition-all hover:text-slate-50"
                      >
                        Settings
                      </Link>
                      <Link
                        href="/logout"
                        className="transition-all hover:text-slate-50"
                      >
                        Log out
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-slate-100 transition-all hover:bg-slate-800 hover:text-slate-50">
                Zaloguj sie
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
