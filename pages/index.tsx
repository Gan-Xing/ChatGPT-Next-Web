import { Analytics } from "@vercel/analytics/react";
import Head from "next/head"; // 新添加的代码

import { Home } from "@/app/components/home";

import { getServerSideConfig } from "@/app/config/server";

const serverConfig = getServerSideConfig();

export default function App() {
  return (
    <>
      <Head>
        <title>ChatGPT Next Web</title>
        <meta name="description" content="Your personal ChatGPT Chat Bot." />
      </Head>
      <Home />
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
