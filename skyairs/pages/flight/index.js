import Navbar from "@/components/partials/Navbar";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Flight from "@/components/partials/Flight/flight";

export default function FlightSearch() {
  const [showNavbar, setShowNavbar] = useState("up");
  const [changeFlight, setChangeFlight] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      console.log(
        "lastScrollY",
        lastScrollY,
        " scrollY",
        scrollY,
        "direction",
        direction
      );
      setShowNavbar(direction);
      // if (
      //   direction !== showNavbar &&
      //   (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      // ) {
      //   setShowNavbar(direction);
      // }
      // lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);
  console.log(showNavbar);

  const toggleChangeFlight = () => {
    setChangeFlight(!changeFlight);
  };

  return (
    <main className="flex flex-col items-center relative h-[100vh] scrollbar-hide">
      <section
        className={`sticky shadow-md bg-white w-full z-20 transition-all duration-300 ${
          showNavbar === "down" ? "-top-[67px]" : "top-0"
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

                  <div className="text-base font-bold flex gap-x-[5px] items-center whitespace-nowrap">
                    <div>origin-city</div>

                    <div className="flex items-center">
                      <FaArrowRightLong className="block" />
                    </div>

                    <div>destination-city</div>
                  </div>

                  <div className="flex whitespace-nowrap">
                    <div>start-date</div>
                  </div>
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
          <div className="flex flex-col gap-y-[5px] items-start">
            <p className="text-base font-bold">
              เที่ยวบินขาออก destination-city-thai if return เที่ยวบินขากลับ
              destination_city_thai
            </p>
            <div className="flex gap-x-[5px]">start-date</div>
          </div>
        </div>

        {/* //? all data */}
        <section className="pt-5 pb-6">
          <div className="flex flex-col gap-y-[10px]">
            {/* //todo: map for all data */}
            <div className="card-container">
              <div className="airline-data desktop:pb-0 pb-4">
                <p>data.origin_airport_thai</p>
              </div>

              <div className="da">
                <div className="time-data desktop:pb-0 pb-4">
                  <div>
                    <p className="front-data">data.depart_time</p>
                    <p className="code-data">data.origin_code</p>
                  </div>

                  <div className="icon-go-return">
                    <BsThreeDots className="arrow" />
                    <BsThreeDots className="arrow" />
                    <FaChevronRight className="arrow-right" />
                  </div>

                  <div className="des">
                    <p className="front-data">data.arrival_time</p>
                    <p className="code-data">data.destination_code</p>
                  </div>
                </div>

                <div className="time-diff desktop:pb-0 pb-4">
                  <div className="front">timeDifference</div>
                </div>

                <div className="price-select">
                  <div className="price pb-4 desktop:pb-0;">
                    <div className="price-flex ">
                      <div className="relative-price">
                        <div className="price">
                          <span className="font-price">
                            ฿ formatNumber(data.fare)
                          </span>
                          <span className="font-per"> /คน</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="select-price">
                    <span>เลือก</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
