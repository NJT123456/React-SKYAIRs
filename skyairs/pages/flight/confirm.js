import { AuthContext } from "@/components/helpers/AuthContext";
import Navbar from "@/components/partials/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Confirm() {
  const router = useRouter();

  const {
    filteredFormData,
    selectFormData,
    setSelectFormData,
    setType,
    codeFrom,
    codeGo,
    seatClass,
    depDate,
    flightTrip,
    retDate,
    setSearchResults,
    formatNumber,
    formatDate,
    formatTime,
    authState,
    setShowForm,
  } = useContext(AuthContext);

  const [confirm, setConfirm] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [Gender, setGender] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [schedules, setSchedules] = useState([]);

  const gender = ["MALE", "FEMALE"];

  const toggleShowGender = () => {
    setShowGender(!showGender);
  };

  const url = `http://localhost:3001/search?origin=${codeFrom}&destination=${codeGo}&seat_class=${seatClass}&dep_date=${formatDate(
    depDate,
    "YYYY-MM-DD"
  )}${
    flightTrip === "roundtrip"
      ? `&ret_date=${formatDate(retDate, "YYYY-MM-DD")}`
      : ""
  }
  `;
  console.log(url);
  const changeAllFlight = () => {
    setSelectFormData([{}]);
    setType("");
    axios.get(url).then((res) => {
      if (res.data.msg === "No flights found for Date.") {
        alert(res.data.msg);
      } else {
        setSearchResults(res.data);

        router.push({ pathname: "/flight", query: filteredFormData });
      }
    });
  };

  const urlconfirm = `http://localhost:3001/confirm`;

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setShowForm(true);
    }
  }, []);

  const toggleConfirm = () => {
    if (!fn || !ln || !Gender || !email || !tel) {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
    } else {
      axios
        .post(
          urlconfirm,
          {
            fn: fn,
            ln: ln,
            gender: Gender,
            email: email,
            tel: tel,
            selectFormData: selectFormData,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log("res", res);
          setConfirm(!confirm);

          setSchedules(res.data);
        });
    }
  };

  const toggleCloseConfirm = () =>{
    setConfirm(!confirm)
  }

  const url_getConfirm = `http://localhost:3001/confirm/get_confirm`;

  const getConfirm = (ref_no) => {
    axios.post(
      url_getConfirm,
      {
        ref_no: ref_no,
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );
    router.push("/flight/order");
  };

  console.log(schedules);

  console.log(selectFormData);
  return (
    <>
      <Navbar className={"sticky top-0 z-30"} />

      <main className="flex flex-col desktop:flex-row desktop:p-8 min-h-[50vh]">
        <div className="flex flex-col desktop:w-[75%]">
          {selectFormData.map((value, idx) => (
            // //? pull data */
            <section className="w-full pb-4 desktop:pr-4">
              <div className="flex-1 flex-row">
                <div className="flex items-center justify-between p-8 bg-white border-b-[0.5px] border-gray">
                  <div className="hidden desktop:block">
                    <p className="text-base mb-3" key={`title-${idx}`}>
                      {idx === 0 ? (
                        <>เที่ยวบินขาออกที่เลือก</>
                      ) : (
                        <>เที่ยวบินขากลับที่เลือก</>
                      )}
                    </p>

                    <div
                      className="flex items-center text-base font-bold mb-3"
                      key={`dep-arr-${idx}`}>
                      {value.origin && value.origin.city_thai}{" "}
                      {value.origin && value.origin.code}
                      <FaArrowRightLong className="text-[14px] mx-5" />
                      {value.destination && value.destination.city_thai}{" "}
                      {value.destination && value.destination.code}
                    </div>
                    <div key={`dapdate-${idx}`}>
                      {formatDate(value.depart_date, "DD MMM YYYY")}
                    </div>
                  </div>
                  <div>
                    <button
                      className="hs-button text-sm"
                      id="changeFlight"
                      onClick={() => changeAllFlight()}>
                      เปลี่ยนเที่ยวบิน
                    </button>
                  </div>
                </div>
                {/* //todo: pull from database */}
                <div className="p-8 rounded bg-white">
                  <div className="flex">
                    <div className="flex-1 flex">
                      <div className="w-[150px] flex flex-col gap-y-2 text-sm">
                        <p className="text-base" key={`airline-${idx}`}>
                          {value.airline}
                        </p>
                        <p key={`code-${idx}`}>{value.fnumber}</p>
                      </div>
                      <div className="flex min-h-[170px]">
                        <div className="flex flex-col justify-between relative">
                          <div className="h-5 w-10 bg-white relative z-[2] pt-2">
                            <div className="relative mx-[2px] z-[2] bg-white w-[6px] h-[6px] rounded-full border border-gray border-solid"></div>
                          </div>

                          <div className="absolute top-0 bottom-0 left-[4.5px] border-r border-gray"></div>

                          <div className="h-5 w-10 bg-white relative z-[2] pt-2">
                            <div className="relative mx-[2px] z-[2] w-[6px] h-[6px] rounded-full bg-gray"></div>
                          </div>
                        </div>

                        <div className="relative flex flex-col items-start justify-between">
                          <div className="flex flex-col gap-y-5 items-start">
                            <p className="font-bold" key={`deptime-${idx}`}>
                              {formatTime(value.depart_time)}
                            </p>
                          </div>
                          <div className="relative flex flex-col items-start gap-y-5">
                            <p className="font-bold" key={`arrtime-${idx}`}>
                              {formatTime(value.arrival_time)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start justify-between ml-[40px]">
                          <div className="flex flex-col items-start">
                            <p
                              className="font-bold mb-5"
                              key={`depCity-${idx}`}>
                              {value.origin && value.origin.city_thai} (
                              {value.origin && value.origin.code})
                            </p>
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="font-bold" key={`arrCity-${idx}`}>
                              {value.origin && value.destination.city_thai} (
                              {value.origin && value.destination.code})
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className="desktop:flex-1 desktop:relative desktop:w-[55%] pt-8 desktop:p-0">
          <div className="sticky top-[82px]">
            <div className="bg-white rounded">
              <div className="hidden desktop:flex border-b-[0.5px] border-gray p-8">
                <p className="font-bold text-lg">รายละเอียดราคา</p>
              </div>
              {/* //todo: pull price from database */}

              <div className="px-8">
                <div className="desktop:pt-8 desktop:pb-15 desktop:pb-8">
                  {selectFormData.map((value, idx) => {
                    return (
                      <div className="hidden desktop:flex items-center justify-between">
                        {/* todo: add airport code to the search result */}

                        <div
                          className="text-sm font-bold flex justify-center items-center"
                          key={`dep-arr-code-${idx}`}>
                          {idx === 0 ? <>ขาไป </> : <>ขากลับ </>}(
                          {value.origin && value.origin.code}
                          <FaArrowRightLong className="text-[14px] mx-2" />
                          {value.destination && value.destination.code})
                        </div>

                        <div className="flex items-center">
                          <p className="text-sm font-bold" key={`price-${idx}`}>
                            ฿ {formatNumber(value.fare)}
                            price
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex desktop:border-t-[0.5px] desktop:border-gray justify-between py-8">
                  <p className="font-bold text-lg">ราคารวม</p>
                  <div className="items-end">
                    <p className="font-bold text-base text-primary text-right mb-3">
                      ฿{" "}
                      {formatNumber(
                        selectFormData
                          .map((f) => f.fare)
                          .reduce((acc, curr) => acc + curr, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="hs-button text-sm w-full mt-8"
              id="changeFlight"
              onClick={toggleConfirm}>
              ยืนยันการจอง
            </button>
          </div>
        </div>
      </main>

      <div className="flex flex-col desktop:flex-row desktop:px-4 min-h-[50vh]">
        <section className="desktop:w-[75%] w-full">
          <div className="desktop:flex-1 flex-row desktop:p-8 w-full">
            <div className="flex items-center justify-between p-8 bg-white border-b-[0.5px] border-gray">
              <div>
                <p className="text-base mb-3">ข้อมูลติดต่อ</p>
              </div>
            </div>
            {/* //todo: pull from database */}
            <div className="p-1 rounded bg-white">
              <div className="flex flex-col">
                <div className="flex-1 flex">
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm">
                    <div className="field">
                      <input
                        id="fn"
                        name="fn"
                        value={fn}
                        onChange={(e) => setFn(e.target.value)}
                        placeholder=""
                        className="input-nav"
                        required
                      />
                      <label className="label-nav">First Name</label>
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm">
                    <div className="field">
                      <input
                        id="ln"
                        name="ln"
                        value={ln}
                        onChange={(e) => setLn(e.target.value)}
                        placeholder=""
                        className="input-nav"
                        required
                      />
                      <label className="label-nav">Last Name</label>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex cursor-pointer">
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm cursor-pointer">
                    <div className={`field`}>
                      <input
                        id="gender"
                        name="gender"
                        placeholder=""
                        autoComplete="off"
                        className="input-nav cursor-pointer capitalize"
                        onClick={toggleShowGender}
                        value={Gender.toLowerCase()}
                        readOnly
                      />
                      <label
                        className={`label-nav ${
                          Gender ? "transform scale-[0.6]" : ""
                        }`}>
                        Gender
                      </label>
                      {showGender && (
                        <div className="absolute drop-shadow-md w-full desktop:mt-[5px] z-10">
                          <div className="flex items-center justify-between rounded-t-md bg-[#f7f7f7] border-b-[0.5px] border-solid border-[#dedede] p-4">
                            <div></div>
                            <button
                              className="border-none bg-transparent cursor-pointer text-[200%]"
                              id="close-search"
                              onClick={toggleShowGender}>
                              &times;
                            </button>
                          </div>

                          {gender.map((item, idx) => (
                            <div
                              className="bg-white rounded-b-md overflow-y-auto max-h-[410px] p-5 cursor-pointer hover:opacity-80 capitalize"
                              key={item}
                              id={item}
                              onClick={() => {
                                setGender(item);
                                toggleShowGender();
                              }}>
                              <div className="capitalize">
                                {item.toLowerCase()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm">
                    <div className="field">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        className="input-nav"
                        required
                      />
                      <label className="label-nav">Enter Email</label>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex">
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm">
                    <div className="field">
                      <input
                        type="tel"
                        id="tel"
                        name="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        placeholder=""
                        className="input-nav"
                        required
                      />
                      <label className="label-nav">Enter Contact Number</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex justify-center items-center">
          <div className="z-[10000] bg-[#d6dce5] border border-solid border-[#888] rounded-xl active-nav p-4">
            <div className="flex justify-between">
              <div></div>
              <button
                className="border-none bg-transparent cursor-pointer text-5xl hover:opacity-80"
                id="close-search"
                onClick={toggleCloseConfirm}>
                &times;
              </button>
            </div>
            <div className="w-full flex flex-col gap-y-9 justify-center items-center p-4">
              <svg
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-[18vw]">
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path
                    className="circle-confirm"
                    d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
                  />
                  <path
                    className="tick-confirm"
                    d="M6.5 13.5L10 17 l8.808621-8.308621"
                  />
                </g>
              </svg>
              <div className="font-bold text-xl text-center">
                Congratulations, Your Flight are booking confirmed.
              </div>
              {schedules.map((schedule, idx) => (
                <div
                  key={idx}
                  className="font-bold text-base text-center flex items-center justify-center">
                  Booking Ref: {schedule.ref_no},{" "}
                  {selectFormData[idx].origin.code}{" "}
                  <FaArrowRightLong className="text-[14px] mx-2" />{" "}
                  {selectFormData[idx].destination.code}
                </div>
              ))}

              <div
                onClick={() => {
                  getConfirm(schedules[0].ref_no);
                  if (schedules.length > 1) {
                    getConfirm(schedules[1].ref_no);
                  }
                }}
                className="bg-primary text-white flex justify-center items-center font-bold p-4 rounded-md hover:opacity-80 cursor-pointer"
                id="link-to-order">
                กลับไปหน้าคำสั่งทั้งหมด
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
