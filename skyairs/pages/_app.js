import Loading from "@/components/Loading";
import { AuthContext } from "@/components/helpers/AuthContext";
import "@/styles/globals.css";
import axios from "axios";
import dayjs from "dayjs";
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

  // !param
  const [wordFrom, setWordFrom] = useState("");
  const [wordGo, setWordGo] = useState("");
  const [codeFrom, setCodeFrom] = useState("");
  const [codeGo, setCodeGo] = useState("");
  const [depDate, setDepDate] = useState(
    dayjs().add(0, "day").format("YYYY-MM-DD")
  );

  const [retDate, setRetDate] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );

  const [type, setType] = useState("");

  const [searchResults, setSearchResults] = useState([]);

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

  const formatDate = (Date) => {
    return dayjs(Date).format("YYYY-MM-DD");
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
          <AuthContext.Provider
            value={{
              authState,
              setAuthState,
              logout,
              wordFrom,
              wordGo,
              setWordFrom,
              setWordGo,
              codeFrom,
              setCodeFrom,
              codeGo,
              setCodeGo,
              formatDate,
              searchResults,
              setSearchResults,
              depDate,
              setDepDate,
              retDate,
              setRetDate,
              type,
              setType,
            }}>
            <Component {...pageProps} />
          </AuthContext.Provider>
        </Suspense>
      )}
    </>
  );
}
