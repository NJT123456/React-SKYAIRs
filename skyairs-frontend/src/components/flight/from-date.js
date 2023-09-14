import React, { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { useGlobalContext } from "../../context"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"

export const FromDate = ({
  showFromDate,
  showGoDate,
  toggleShowFromDate,
  toggleShowGoDate,
  tripType,
}) => {
  const { startDate, setStartDate, endDate, setEndDate } = useGlobalContext()
  const [fromDate, setFromDate] = useState(startDate)
  const [goDate, setGoDate] = useState(endDate)

  const handleFromDateChange = (newValue) => {
    setFromDate(newValue)
    toggleShowFromDate()
    setStartDate(newValue)
  }

  const handleGoDateChange = (newValue) => {
    setGoDate(newValue)
    toggleShowGoDate()
    setEndDate(newValue)
  }

  return (
    <>
      <div className="date-from">
        <div className="date-flex" onClick={toggleShowFromDate} id="button-from-date">
          <button
            className={`date-button ${showFromDate ? "active-flight" : ""}`}>
            <div className="text-date-from">ขาไป</div>
            <div className="from-date">
              {startDate.format("ddd, DD MMM YYYY")}
            </div>
          </button>
        </div>
        {showFromDate && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar"]}>
              <DateCalendar value={fromDate} id="button-from-select-date" onChange={handleFromDateChange} />
            </DemoContainer>
          </LocalizationProvider>
        )}
      </div>
      {tripType === "2" && (
        <div className="date-from">
          <div className="date-flex" onClick={toggleShowGoDate} id="button-go-date">
            <button
              className={`date-button ${showGoDate ? "active-flight" : ""}`}>
              <div className="text-date-from">ขากลับ</div>
              <div className="from-date">
                {endDate.format("ddd, DD MMM YYYY")}
              </div>
            </button>
          </div>
          {showGoDate && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DateCalendar value={goDate} id="button-go-select-date" onChange={handleGoDateChange} />
              </DemoContainer>
            </LocalizationProvider>
          )}
        </div>
      )}
    </>
  )
}
