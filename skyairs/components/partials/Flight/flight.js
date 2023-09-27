import React, { useContext, useEffect, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import FromSearch from "./FromSearch";
import { BsRepeat } from "react-icons/bs";
import FromDate from "./FromDate";
import dayjs from "dayjs";
import FromSelect from "./FromSelect";
import CityData from "@/data/city";
import { AuthContext } from "@/components/helpers/AuthContext";

export default function Flight() {
  const [flightTrip, setFlightTrip] = useState("oneway");
  const [filterFrom, setFilterFrom] = useState([]);
  const [filterGo, setFilterGo] = useState([]);

  const [showSearchFromList, setShowSearchFromList] = useState(false);
  const [showSearchGoList, setShowSearchGoList] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [showGoDate, setShowGoDate] = useState(false);
  const [showSeat, setShowSeat] = useState(false);

  const [Switch, setSwitch] = useState(false);

  const [seatClass, setSeatClass] = useState("");
  const seat = ["Economy", "First"];

  const {
    wordFrom,
    wordGo,
    setWordFrom,
    setWordGo,
    codeFrom,
    setCodeFrom,
    codeGo,
    setCodeGo,
  } = useContext(AuthContext);

  // ! Example for Date
  const [depDate, setDepDate] = useState(
    dayjs().add(0, "day").format("YYYY-MM-DD")
  );

  const [retDate, setRetDate] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  // !-----------------

  const handleChangeFlightType = (e, newFlightTrip) => {
    setFlightTrip(newFlightTrip);
  };

  const toggleShowFromList = () => {
    setShowSearchFromList(!showSearchFromList);
    setShowSearchGoList(false);
    setShowFromDate(false);
    setShowGoDate(false);
    setShowSeat(false);
  };

  const toggleShowGoList = () => {
    setShowSearchGoList(!showSearchGoList);
    setShowSearchFromList(false);
    setShowFromDate(false);
    setShowGoDate(false);
    setShowSeat(false);
  };

  const toggleSwitch = () => {
    setSwitch(!Switch);
    setWordFrom(wordGo);
    setWordGo(wordFrom);
    setCodeFrom(codeGo);
    setCodeGo(codeFrom);
  };

  const toggleShowFromDate = () => {
    setShowFromDate(!showFromDate);
    setShowGoDate(false);
    setShowSearchFromList(false);
    setShowSearchGoList(false);
    setShowSeat(false);
  };

  const toggleShowGoDate = () => {
    setShowGoDate(!showGoDate);
    setShowFromDate(false);
    setShowSearchFromList(false);
    setShowSearchGoList(false);
    setShowSeat(false);
  };

  const toggleShowSeat = () => {
    setShowSeat(!showSeat);
    setShowGoDate(false);
    setShowFromDate(false);
    setShowSearchFromList(false);
    setShowSearchGoList(false);
  };

  // todo: search

  useEffect(() => {
    const resultFrom = CityData.filter((item) =>
      item.city.toLowerCase().includes(wordFrom.toLowerCase())
    );
    setFilterFrom(resultFrom);

    const resultGo = CityData.filter((item) =>
      item.city.toLowerCase().includes(wordGo.toLowerCase())
    );
    setFilterGo(resultGo);
  }, [wordFrom, wordGo]);

  const ChangeCodeFrom = (city, code) => {
    setWordFrom(city);
    setCodeFrom(code);
    toggleShowFromList();
  };

  const ChangeCodeGo = (city, code) => {
    setWordGo(city);
    setCodeGo(code);
    toggleShowGoList();
  };

  return (
    <div className="bg-white rounded shadow-md desktop:p-10 p-4">
      <TabContext value={flightTrip}>
        <Box className="relative w-full flex items-center flex-col justify-center desktop:items-start desktop:justify-start">
          <Box className="relative w-full flex items-center justify-center desktop:items-start desktop:justify-start border-b border-solid">
            <Tabs
              value={flightTrip}
              onChange={handleChangeFlightType}
              aria-label="flight-types"
              className="w-[500px] justify-center items-center desktop:w-[25%]">
              <Tab
                label="เที่ยวเดียว"
                className="w-[50%] desktop:w-[35%] font-Prompt"
                id="OneWay"
                value="oneway"
              />
              <Tab
                label="ไป-กลับ"
                className="w-[50%] desktop:w-[35%] font-Prompt"
                id="roundTrip"
                value="roundtrip"
              />
            </Tabs>
          </Box>
          <div className="relative mt-10 w-full desktop:w-auto md:w-[50%] desktop:flex desktop:gap-x-[10px]">
            <div className="flex flex-col-reverse">
              <div className="desktop:relative desktop:flex desktop:gap-x-[10px]">
                <div className="relative py-1">
                  {/* from */}
                  <FromSearch
                    id={"from-flight"}
                    showSearchList={showSearchFromList}
                    toggleShowList={toggleShowFromList}
                    label={"จาก"}
                    placeholder={"ต้นทาง"}
                    value={wordFrom}
                    changeValueSearch={setWordFrom}
                    FilterList={filterFrom}
                    changeValue={ChangeCodeFrom}
                  />
                </div>
                {/* go */}
                <div className="relative py-1">
                  <FromSearch
                    id={"go-flight"}
                    showSearchList={showSearchGoList}
                    toggleShowList={toggleShowGoList}
                    label={"ไปยัง"}
                    placeholder={"ปลายทาง"}
                    value = {wordGo}
                    changeValueSearch={setWordGo}
                    FilterList={filterGo}
                    changeValue={ChangeCodeGo}
                  />
                </div>
                <button
                  className={`switch-button ${Switch ? "active-switch" : ""}`}
                  onClick={toggleSwitch}>
                  <div className="icon">
                    <BsRepeat />
                  </div>
                </button>
              </div>
            </div>
            {/* date */}
            <FromDate
              flightTrip={flightTrip}
              depDate={depDate}
              retDate={retDate}
              setDepDate={setDepDate}
              setRetDate={setRetDate}
              toggleShowFromDate={toggleShowFromDate}
              toggleShowGoDate={toggleShowGoDate}
              showFromDate={showFromDate}
              showGoDate={showGoDate}
            />

            {/* seatclass */}
            <FromSelect
              show={showSeat}
              toggleShow={toggleShowSeat}
              select={seatClass}
              changeValue={setSeatClass}
              id={"seat-flight"}
              label={"ชั้นโดยสาร"}
              placeholder={"ประเภทชั้นโดยสาร"}
              textHeader={"เลือกประเภทชั้นโดยสาร"}
              item={seat}
            />
          </div>
        </Box>
      </TabContext>
    </div>
  );
}
