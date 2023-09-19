import React, { useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import FromSearch from "./FromSearch";
import { BsRepeat } from "react-icons/bs"

export default function Flight() {
  const [flightTrip, setFlightTrip] = useState("oneway");
  const [showSearchFromList, setShowSearchFromList] = useState(false);
  const [showSearchGoList, setShowSearchGoList] = useState(false);

  const handleChangeFlightType = (e, newFlightTrip) => {
    setFlightTrip(newFlightTrip);
  };

  const toggleShowFromList = () => {
    setShowSearchFromList(!showSearchFromList);
    setShowSearchGoList(false);
  };

  const toggleShowGoList = () => {
    setShowSearchGoList(!showSearchGoList);
    setShowSearchFromList(false);
  };
  return (
    <div className="bg-white rounded shadow-md desktop:p-10 p-4">
      <TabContext value={flightTrip}>
        <Box className="relative w-full flex items-center flex-col justify-center desktop:items-start desktop:justify-start">
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

          <div className="relative mt-10 w-full desktop:w-auto md:w-[50%]">
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
                    // value = {wordFrom}
                    // changeValueSearch={setWordFrom}
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
                    // value = {wordFrom}
                    // changeValueSearch={setWordFrom}
                  />
                </div>
                <button className={`switch-button`}>
                  <div className="icon">
                    <BsRepeat />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Box>
      </TabContext>
    </div>
  );
}
