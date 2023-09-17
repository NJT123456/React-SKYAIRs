import "@/styles/globals.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: ["300", "400"],
  subsets: ["latin", "thai"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --body-font: ${prompt.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
