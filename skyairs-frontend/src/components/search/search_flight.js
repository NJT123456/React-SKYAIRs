import React, { useEffect, useState } from "react"
import "../../static/css/flight.css"
import { useGlobalContext } from "../../context"
import { FromSearch } from "../flight/from-search"
import { FromDate } from "../flight/from-date"
import { BsSearch } from "react-icons/bs"
import SeatClassCom from "../flight/seat-class"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const SearchFlight = ({ isReturn, changeFlight }) => {
  const {
    tripType,
    setTripType,
    startDate,
    endDate,
    SeatClass,
    setSearchResults,
    valueFrom,
    valueGo,
    setLoading,
    wordFrom,
    wordGo,
  } = useGlobalContext()

  const [showFromList, setShowFromList] = useState(false)
  const [showGoList, setShowGoList] = useState(false)
  const [showFromDate, setShowFromDate] = useState(false)
  const [showGoDate, setShowGoDate] = useState(false)
  const [showSeatClass, setShowSeatClass] = useState(false)
  const navigate = useNavigate()
  const formatStartDate = startDate.format("YYYY-MM-DD")
  const formatEndDate = endDate.format("YYYY-MM-DD")

  const toggleShowFromList = () => {
    setShowFromList(!showFromList)
    setShowGoList(false)
    setShowFromDate(false)
    setShowGoDate(false)
    setShowSeatClass(false)
  }

  const toggleShowGoList = () => {
    setShowGoList(!showGoList)
    setShowFromList(false)
    setShowFromDate(false)
    setShowGoDate(false)
    setShowSeatClass(false)
  }

  const toggleShowFromDate = () => {
    setShowFromDate(!showFromDate)
    setShowFromList(false)
    setShowGoList(false)
    setShowGoDate(false)
    setShowSeatClass(false)
  }

  const toggleShowGoDate = () => {
    setShowGoDate(!showGoDate)
    setShowFromList(false)
    setShowGoList(false)
    setShowFromDate(false)
    setShowSeatClass(false)
  }

  const toggleShowSeatClass = () => {
    setShowSeatClass(!showSeatClass)
    setShowFromList(false)
    setShowGoList(false)
    setShowFromDate(false)
    setShowGoDate(false)
  }

  const url = `http://localhost:3001/getData?code_origin=${valueFrom}&code_destination=${valueGo}&seat_class=${SeatClass}&tripType=${tripType}&depart_date=${formatStartDate}`

  console.log(isReturn)

  // console.log(url)
  const handleSearch = () => {
    Axios.get(url, {
      tripType: tripType,
    })
      .then((res) => {
        console.log(res.data.data)
        if (Array.isArray(res.data.data)) {
          setSearchResults(res.data.data)
          if (res.data.msg === "No flights found for Date.") {
            alert(res.data.msg)
          }
          if (res.data.data.length > 0) {
            navigate(
              `/search?code_origin=${valueFrom}&code_destination=${valueGo}&depart_date=${formatStartDate}${
                tripType === "2" ? `&return_date=${formatEndDate}` : ""
              }&seat_class=${SeatClass}`,
              { replace: true }
            )
          }
        } else {
          alert("Invalid data format received.")
        }
      })
      .catch((error) => {
        console.error("Error searching for tickets:", error)
      })
  }

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div
      className={`container-flight ${
        changeFlight ? "" : "close-search-flight"
      }`}>
      <div className="tab-wrap">
        <input
          type="radio"
          name="TripType"
          value="1"
          className="tab"
          id="tab1"
          checked={tripType === "1"}
          onChange={handleTripTypeChange}
        />
        <label htmlFor="tab1" className="label-flight">
          เที่ยวเดียว
        </label>
        <input
          type="radio"
          name="TripType"
          value="2"
          className="tab"
          id="tab2"
          checked={tripType === "2"}
          onChange={handleTripTypeChange}
        />
        <label htmlFor="tab2" className="label-flight">
          ไป-กลับ
        </label>
      </div>
      <div className="tab__content">
        <FromSearch
          showFromList={showFromList}
          showGoList={showGoList}
          toggleShowFromList={toggleShowFromList}
          toggleShowGoList={toggleShowGoList}
        />
        {/* date */}
        <FromDate
          tripType={tripType}
          showFromDate={showFromDate}
          showGoDate={showGoDate}
          toggleShowFromDate={toggleShowFromDate}
          toggleShowGoDate={toggleShowGoDate}
          tripType={tripType}
        />
        <SeatClassCom
          showSeatClass={showSeatClass}
          toggleShowSeatClass={toggleShowSeatClass}
        />
        <div className="button-flight" onClick={handleSearch}>
          <button className="search-flight">
            <BsSearch className="icon-search" />
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchFlight
