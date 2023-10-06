import Navbar from "@/components/partials/Navbar";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Flight from "@/components/partials/Flight/flight";
import { AuthContext } from "@/components/helpers/AuthContext";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";

export default function FlightSearch() {
  const router = useRouter();
  const { depAirport, arrAirport, seatClass, depDate, retDate, type } =
    router.query;

  const flightContainerRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [changeFlight, setChangeFlight] = useState(false);

  const {
    searchResults,
    uniqueFlights,
    // type,
    setType,
    formatNumber,
    formatTime,
    selectFormData,
    setSelectFormData,
    setSearchResults,
    flightTrip,
    // codeFrom,
    // codeGo,
    // retDate,
    // depDate,
    // seatClass,
    formatDate,
    filteredFormData,
  } = useContext(AuthContext);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = flightContainerRef.current.scrollTop;
      const direction = scrollY > 67 ? false : true;
      setShowNavbar(direction);
    };

    const container = flightContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollDirection);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollDirection);
      }
    };
  }, []);

  const toggleChangeFlight = () => {
    setChangeFlight(!changeFlight);
  };

  const timeDiff = (depTime, arrTime) => {
    const startTime = dayjs(depTime, "HH:mm:ss");
    const endTime = dayjs(arrTime, "HH:mm:ss");
    const duration = endTime.diff(startTime);

    return dayjs(duration).format("HH ชั่วโมง mm นาที");
  };

  const url = `http://localhost:3001/search?depAirport=${depAirport}&arrAirport=${arrAirport}&seatClass=${seatClass}&depDate=${formatDate(
    depDate,
    "YYYY-MM-DD"
  )}${
    flightTrip === "roundtrip"
      ? `&retDate=${formatDate(retDate, "YYYY-MM-DD")}`
      : ""
  }`;

  useEffect(() => {
    // Check the URL pathname to determine if you should make the axios requests
    if (router.pathname !== "/flight") {
      if (type === "return") {
        const newUrl = `http://localhost:3001/search?depAirport=${depAirport}&arrAirport=${arrAirport}&seatClass=${seatClass}&depDate=${formatDate(
          depDate,
          "YYYY-MM-DD"
        )}&retDate=${formatDate(retDate, "YYYY-MM-DD")}&type=return`;

        axios.get(newUrl).then((res) => {
          if (res.data.msg === "No flights found for Date.") {
            alert(res.data.msg);
          } else {
            setSearchResults(res.data);
          }
        });
      } else {
        axios.get(url).then((res) => {
          if (res.data.msg === "No flights found for Date.") {
            alert(res.data.msg);
          } else {
            setSearchResults(res.data);
          }
        });
      }
    }
  }, []);

  const onSubmit = (data) => {
    if (flightTrip === "oneway") {
      setType("");
      setSelectFormData([data]);
      localStorage.setItem("selectFormData", JSON.stringify([data]));
      router.push("/flight/confirm");
    } else {
      setType("return");

      const newSelectFormData =
        type === "return" ? [...selectFormData, data] : [data];
      setSelectFormData(newSelectFormData);
      localStorage.setItem("selectFormData", JSON.stringify(newSelectFormData));

      if (type === "return") {
        router.push("/flight/confirm");
      } else {
        // ระบุ type เป็น "return" และรีไรเร็คไปหน้าค้นหา flight
        router.push({
          pathname: "/flight",
          query: { ...filteredFormData, type: "return" },
        });
      }
    }
  };

  return (
    <main
      ref={flightContainerRef}
      className="flex flex-col items-center relative h-[100vh] overflow-y-scroll scrollbar-hide">
      <section
        className={`sticky shadow-md bg-white w-full z-20 transition-all duration-300 ${
          showNavbar ? "top-0" : "-top-[67px]"
        }`}>
        <Navbar className={`relative top-0 z-30`} />
        <div
          className={`h-[150px] ${
            changeFlight
              ? "search-height-active search-height-enter-done"
              : "search-height-active search-height-exit"
          }`}>
          <Flight />
        </div>

        <div className="border border-solid border-zinc-200">
          <div className="my-0 mx-auto h-[110px] flex justify-between w-full p-5">
            <div className="flex relative">
              <div className="px-0 py-[10px] gap-x-5 items-center absolute transform -translate-y-[50%] scale-100 top-[50%]">
                <div className="flex flex-col gap-y-[10px]">
                  {/* //todo: from database */}
                  {uniqueFlights.map((value, idx) => (
                    <div key={`flight-${idx}`}>
                      <div className="text-base font-bold flex gap-x-[5px] items-center whitespace-nowrap">
                        <div key={`origin_city_thai-${idx}`}>
                          {value.origin_city_thai}
                        </div>

                        <div className="flex items-center" key={`sym-${idx}`}>
                          <FaArrowRightLong className="block" />
                        </div>

                        <div key={`destination_city_thai-${idx}`}>
                          {value.destination_city_thai}
                        </div>
                      </div>

                      <div className="flex whitespace-nowrap">
                        <div key={`date_one-${idx}`}>{value.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center">
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

      {/* //todo: data */}
      <section className="w-full flex mt-1 p-5 flex-col">
        <div className="w-full flex gap-x-[10px]">
          {/* //? pull from database */}
          {uniqueFlights.map((value, idx) => (
            <div key={'uni-${idx}'}>
              <div className="flex flex-col gap-y-[5px] items-start">
                <p className="text-base font-bold" key={`text-${idx}`}>
                  {type === "return" ? (
                    <>เที่ยวบินขากลับ </>
                  ) : (
                    <>เที่ยวบินขาออก </>
                  )}
                  {value.destination_city_thai}
                </p>
                <div className="flex gap-x-[5px]" key={`date-${idx}`}>
                  {value.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* //? all data */}
        <section className="pt-5 pb-6">
          <div className="flex flex-col gap-y-[10px]">
            {/* //todo: map for all data */}
            {searchResults.map((data, idx) => (
              <div className="card-container">
                <div
                  className="airline-data desktop:pb-0 pb-4"
                  key={`airline-data-${idx}`}>
                  <p>{data.origin_airport_thai}</p>
                </div>

                <div className="da">
                  <div className="time-data desktop:pb-0 pb-4">
                    <div>
                      <p className="front-data" key={`depart_time-${idx}`}>
                        {formatTime(data.depart_time)}
                      </p>
                      <p className="code-data" key={`ori-code-${idx}`}>
                        {data.origin.code}
                      </p>
                    </div>

                    <div className="icon-go-return">
                      <BsThreeDots className="arrow" />
                      <BsThreeDots className="arrow" />
                      <FaChevronRight className="arrow-right" />
                    </div>

                    <div className="des">
                      <p className="front-data" key={`arrival_time-${idx}`}>
                        {formatTime(data.arrival_time)}
                      </p>
                      <p className="code-data" key={`des-code-${idx}`}>
                        {data.destination.code}
                      </p>
                    </div>
                  </div>

                  <div className="time-diff desktop:pb-0 pb-4">
                    <div className="front" key={`airline-data-diff-${idx}`}>
                      {timeDiff(data.depart_time, data.arrival_time)}
                    </div>
                  </div>

                  <div className="price-select">
                    <div className="price pb-4 desktop:pb-0;">
                      <div className="price-flex ">
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
                      onClick={() => onSubmit(data)}>
                      <span>เลือก</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
