
import Loading from "@/components/Loading";
import "@/styles/globals.css";
import { Prompt } from "next/font/google";
import { useRouter } from "next/router";
import { Suspense, useEffect, useRef, useState } from "react";

const prompt = Prompt({
  weight: ["300", "400"],
  subsets: ["latin", "thai"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return (
    <>
      <style jsx global>
        {`
          :root {
            --body-font: ${prompt.style.fontFamily};
          }
        `}
      </style>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      )}
    </>
  );
}
