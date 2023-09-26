import Loading from "@/components/Loading";
import { AuthContext } from "@/components/helpers/AuthContext";
import "@/styles/globals.css";
import axios from "axios";
import { Prompt } from "next/font/google";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";

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

  // todo: login logout
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
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
          <AuthContext.Provider value={{ authState, setAuthState, logout }}>
            <Component {...pageProps} />
          </AuthContext.Provider>
        </Suspense>
      )}
    </>
  );
}
