import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [wordFrom, setWordFrom] = useState("");
  const [wordGo, setWordGo] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [SeatClass, setSeatClass] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tripType, setTripType] = useState("1");
  const [success, setSuccess] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [valueFrom, setValueFrom] = useState("");
  const [valueGo, setValueGo] = useState("");
  const [unique, setUnique] = useState([]);
  const [selectFlight, setSelectFlight] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const cities_origin = new Set(
      searchResults.map(
        (val) => val.origin_city
        // === wordFrom ? val.origin_city : ""
      )
    );
    const cities_destination = new Set(
      searchResults.map(
        (val) => val.destination_city
        // === wordGo ? val.destination_city : ""
      )
    );

    const cities_start_date = new Set(
      searchResults.map(
        (val) => dayjs(val.depart_date).format("ddd, DD MMM YYYY")
        // ===
        // dayjs(startDate).format("ddd, DD MMM YYYY")
        //   ? dayjs(val.depart_date).format("ddd, DD MMM")
        //   : ""
      )
    );
    const cities_end_date = new Set(
      searchResults.map(
        (val) => dayjs(val.depart_date).format("ddd, DD MMM YYYY")
        // ===
        // dayjs(endDate).format("ddd, DD MMM YYYY")
        //   ? dayjs(val.depart_date).format("ddd, DD MMM")
        //   : ""
      )
    );
    const cities_origin_thai = new Set(
      searchResults.map(
        (val) => val.origin_city_thai
        // === wordFrom ? val.origin_city_thai : ""
      )
    );
    const cities_destination_thai = new Set(
      searchResults.map(
        (val) => val.destination_city_thai
        // === wordGo ? val.destination_city_thai : ""
      )
    );
    console.log(cities_destination_thai);
    const uniqueArray = [
      {
        origin_city: Array.from(cities_origin),
        destination_city: Array.from(cities_destination),
        start_date: Array.from(cities_start_date),
        end_date: Array.from(cities_end_date),
        origin_city_thai: Array.from(cities_origin_thai),
        destination_city_thai: Array.from(cities_destination_thai),
      },
    ];

    setUnique(uniqueArray);
    setLoading(false);
  }, [searchResults, wordFrom, wordGo, startDate, endDate]);

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        showForm,
        setShowForm,
        wordFrom,
        setWordFrom,
        wordGo,
        setWordGo,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        SeatClass,
        setSeatClass,
        tripType,
        setTripType,
        searchResults,
        setSearchResults,
        success,
        setSuccess,
        valueFrom,
        setValueFrom,
        valueGo,
        setValueGo,
        unique,
        setUnique,
        formatNumber,
        selectFlight,
        setSelectFlight,
        isReturn,
        setIsReturn,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
