import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function FromDate({
  flightTrip,
  depDate,
  retDate,
  range,
  setDepDate,
  setRange,
  toggleShowFromDate,
  toggleShowGoDate,
  showFromDate,
  showGoDate,
  setRetDate,
}) {
  const handleFromDateChange = (newValue) => {
    setDepDate(newValue);
    toggleShowFromDate();
  };

  const handleGoDateChange = (newValue) => {
    toggleShowGoDate();
    setRetDate(newValue);
  };

  return (
    <>
      <div className="flex relative flex-1 gap-x-[10px]">
        <div className="relative flex-1 py-1" id="button-from-date">
          <button
            className={`text-left appearance-none bg-transparent cursor-pointer py-[10px] px-[15px] min-h-[68px] desktop:w-[191px] min-[1460px]:w-[285px] w-full overflow-hidden border-[0.5px] border-solid ${
              showFromDate ? "border-red-600" : "border-[#d8d8d8]"
            } rounded-md`}
            onClick={toggleShowFromDate}>
            <div className="text-xs text-[#9a9a9a] mb-[10px]">ขาไป</div>
            <div className="font-bold text-[#5c5c5c] w-full block text-sm border-none outline-none">
              {dayjs(depDate).format("ddd, DD MMM YYYY")}
            </div>
          </button>
        </div>
        {showFromDate && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(depDate)}
              id="button-from-select-date"
              onChange={handleFromDateChange}
            />
          </LocalizationProvider>
        )}
      </div>

      {flightTrip === "roundtrip" && (
        <div className="flex relative flex-1 gap-x-[10px]">
          <div className="relative flex-1 py-1" id="button-go-date">
            <button
              className={`text-left appearance-none bg-transparent cursor-pointer py-[10px] px-[15px] min-h-[68px] desktop:w-[191px] w-full overflow-hidden border-[0.5px] border-solid ${
                showGoDate ? "border-red-600" : "border-[#d8d8d8]"
              } rounded-md`}
              onClick={toggleShowGoDate}>
              <div className="text-xs text-[#9a9a9a] mb-[10px]">ขากลับ</div>
              <div className="font-bold text-[#5c5c5c] w-full block text-sm border-none outline-none">
                {dayjs(retDate).format("ddd, DD MMM YYYY")}
              </div>
            </button>
            {showGoDate && (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={dayjs(retDate)}
                    id="button-go-select-date"
                    onChange={handleGoDateChange}
                  />
                </LocalizationProvider>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
