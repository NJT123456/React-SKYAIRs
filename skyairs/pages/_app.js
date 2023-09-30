import { AuthContext } from "@/components/helpers/AuthContext";
import "@/styles/globals.css";
import axios from "axios";
import dayjs from "dayjs";
import { Prompt } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const prompt = Prompt({
  weight: ["300", "400"],
  subsets: ["latin", "thai"],
});

export default function App({ Component, pageProps }) {
  // !
  const [flightTrip, setFlightTrip] = useState("oneway");
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

  const [seatClass, setSeatClass] = useState("");

  const [type, setType] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [selectFormData, setSelectFormData] = useState([{}]);

  const [filteredFormData, setFilterFormData] = useState({});

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

  const formatDate = (Date, format) => {
    return format === "YYYY-MM-DD"
      ? dayjs(Date).format("YYYY-MM-DD")
      : format === "ddd, DD MMM"
      ? dayjs(Date).format("ddd, DD MMM")
      : format === "DD MMM YYYY"
      ? dayjs(Date).format("DD MMM YYYY")
      : "";
  };

  const formatTime = (Time) => {
    const time = dayjs(Time, "HH:mm:ss");

    return dayjs(time).format("HH:mm");
  };

  // todo:make group search

  const flightSearchGroups = new Set();

  searchResults.forEach((flight) => {
    const originCityThai = flight.origin.city_thai.trim(); // Remove leading/trailing spaces
    const destinationCityThai = flight.destination.city_thai.trim(); // Remove leading/trailing spaces
    const date = flight.depart_date;

    const key = JSON.stringify({
      origin_city_thai: originCityThai,
      destination_city_thai: destinationCityThai,
      date: formatDate(date, "ddd, DD MMM"),
    });

    flightSearchGroups.add(key);
  });

  const uniqueFlights = Array.from(flightSearchGroups).map((key) =>
    JSON.parse(key)
  );

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
          uniqueFlights,
          formatNumber,
          formatTime,
          selectFormData,
          setSelectFormData,
          flightTrip,
          setFlightTrip,
          seatClass,
          setSeatClass,
          filteredFormData,
          setFilterFormData,
        }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
