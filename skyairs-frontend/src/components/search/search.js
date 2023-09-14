import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useGlobalContext } from "../../context"
import Axios from "axios"
import { Loading } from "../Loading"
import dayjs from "dayjs"
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6"
import { BsThreeDots } from "react-icons/bs"
import "../../static/css/search.css"
import SearchFlight from "./search_flight"
import Navbar from "../nav"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const {
    tripType,
    endDate,
    SeatClass,
    setSearchResults,
    valueFrom,
    valueGo,
    wordFrom,
    wordGo,
    isReturn,
    searchResults,
    loading,
    setLoading,
    unique,
    startDate,
    formatNumber,
    setIsReturn,
  } = useGlobalContext()
  const [showNavbar, setShowNavbar] = useState(false)
  const [changeFlight, setChangeFlight] = useState(false)
  const stickyRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const navigate = useNavigate()
  const formatStartDate = startDate.format("YYYY-MM-DD")
  const formatEndDate = endDate.format("YYYY-MM-DD")

  useEffect(() => {
    if (!stickyRef.current) {
      return
    }
    setOffset(stickyRef.current.offsetTop)
  }, [stickyRef, setOffset])

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return
      }

      setShowNavbar(window.scrollY > offset)
    }
    window.addEventListener("scroll", handleScroll)
  }, [setShowNavbar, stickyRef, offset])

  useEffect(() => {
    setLoading(false)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2000)
    console.log(startDate)
    console.log("Search Results:", searchResults)
    console.log(unique)
  }, [searchResults, endDate, tripType])

  const toggleChangeFlight = () => {
    setChangeFlight(!changeFlight)
  }

  function formatTimeDifference(departTimeStr, arrivalTimeStr) {
    const departTime = new Date(`1970-01-01T${departTimeStr}`)
    const arrivalTime = new Date(`1970-01-01T${arrivalTimeStr}`)

    const timeDifferenceInSeconds = Math.abs((departTime - arrivalTime) / 1000)

    const hours = Math.floor(timeDifferenceInSeconds / 3600)
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60)

    return `${hours} ชั่วโมง ${minutes} นาที`
  }

  function formatTime(TimeStr) {
    const departTime = new Date(`1970-01-01T${TimeStr}`)
    const hours = String(departTime.getHours()).padStart(2, "0")
    const minutes = String(departTime.getMinutes()).padStart(2, "0")

    return `${hours}:${minutes}`
  }

  const url_return = `http://localhost:3001/getData?code_origin=${valueFrom}&code_destination=${valueGo}&seat_class=${SeatClass}&tripType=${tripType}${
    tripType === "2"
      ? isReturn
        ? `&return_date=${formatEndDate}&isReturn=${isReturn}`
        : ``
      : ""
  }`
  console.log(url_return)

  const toggleSelectFlight = () => {
    if (tripType === "2") {
      setIsReturn(true)

      Axios.get(url_return, {
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
                  tripType === "2"
                    ? isReturn === true
                      ? `&return_date=${formatEndDate}&isReturn=${isReturn}`
                      : `&return_date=${formatEndDate}`
                    : ""
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
  }
  return (
    <body className="body">
      {loading ? (
        ""
      ) : (
        <>
          <section
            className={`head-search ${
              showNavbar ? "head-search-show-navbar" : ""
            }`}
            ref={stickyRef}>
            <Navbar />
            <div
              className={`${
                changeFlight
                  ? "search-height-active search-height-enter-done"
                  : "search-height-active search-height-exit"
              }`}>
              <SearchFlight isReturn={isReturn} />
            </div>

            <div className="hs">
              <div className="container-hs">
                <div className="hs-relative">
                  <div className="show-hs">
                    <div className="hs-show-flight">
                      {unique.map((city, uidx) => (
                        <>
                          <div className="show-text-flight">
                            <div key={`unique-origin-${uidx}`}>
                              {city.origin_city}
                            </div>
                            <div className="icon-arrow">
                              <FaArrowRightLong className="arrow" />
                            </div>
                            <div key={`unique-destination-${uidx}`}>
                              {city.destination_city}
                            </div>
                          </div>
                          <div className="date-select">
                            <div key={`unique-start-date-${uidx}`}>
                              {city.start_date}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hs-item">
                  <button
                    className="hs-button"
                    id="changeFlight"
                    onClick={toggleChangeFlight}>
                    เปลี่ยนเที่ยวบิน
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* data */}
          <section className="search-data">
            <div className="bg-sd">
              <div className="sd">
                {unique.map((data, idx) => {
                  return (
                    <div className="sd-triptype">
                      <div className="sd-triptype-text">
                        <p className="text-sd" key={`triptype1-text-${idx}`}>
                            เที่ยวบินขาออก {data.destination_city_thai}
                        </p>
                      </div>
                      <div
                        className="date_triptype"
                        key={`triptype1-date-${idx}`}>
                        {data.start_date}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="show-sd"></div>
            </div>
            {/* all data */}
            <section className="all-data">
              <div className="all-data-flex">
                {searchResults.map((data, idx) => {
                  const timeDifference = formatTimeDifference(
                    data.depart_time,
                    data.arrival_time
                  )
                  return (
                    <div className="card-container">
                      <div className="airline-data">
                        <p key={`airline-data-oneway-${idx}`}>
                          {data.origin_airport_thai}
                        </p>
                      </div>

                      <div className="da">
                        <div className="time-data">
                          <div>
                            <p className="front-data">
                              {formatTime(data.depart_time)}
                            </p>
                            <p className="code-data">{data.origin_code}</p>
                          </div>

                          <div className="icon-go-return">
                            <BsThreeDots className="arrow" />
                            <BsThreeDots className="arrow" />
                            <FaChevronRight className="arrow-right" />
                          </div>

                          <div className="des">
                            <p className="front-data">
                              {formatTime(data.arrival_time)}
                            </p>
                            <p className="code-data">{data.destination_code}</p>
                          </div>
                        </div>

                        <div className="time-diff">
                          <div
                            className="front"
                            key={`airline-data-diff-oneway-${idx}`}>
                            {timeDifference}
                          </div>
                        </div>

                        <div className="price-select">
                          <div className="price">
                            <div className="price-flex">
                              <div className="relative-price">
                                <div className="price">
                                  <span
                                    className="font-price"
                                    key={`price-data-${idx}`}>
                                    ฿ {formatNumber(data.fare)}
                                  </span>
                                  <span className="font-per"> /คน</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            className="select-price"
                            onClick={toggleSelectFlight}>
                            <span>เลือก</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </section>
        </>
      )}
    </body>
  )
}

export default Search
