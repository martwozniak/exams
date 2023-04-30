import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from'@vercel/analytics/react';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Layout from "~/layouts/layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Layout>
      <Component {...pageProps} />
      </Layout>

      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
