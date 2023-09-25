import Navbar from "@/components/partials/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6";

export default function Confirm() {
  const [confirm, setConfirm] = useState(true);

  const toggleConfirm = () => {
    setConfirm(!confirm);
  };
  return (
    <>
      <Navbar className={"sticky top-0 z-30"} />

      <main className="flex flex-col desktop:flex-row desktop:p-8 min-h-[50vh]">
        {/* //? pull data */}
        <section className="w-full desktop:w-[75%] ">
          <div className="flex-1 flex-row desktop:mr-8">
            <div className="flex items-center justify-between p-8 bg-white border-b-[0.5px] border-gray">
              <div className="hidden desktop:block">
                <p className="text-base mb-3">
                  flight.title(เที่ยวบินขาออกที่เลือก : เที่ยวบินขากลับที่เลือก)
                </p>
                <div className="flex items-center text-base font-bold mb-3">
                  flight.dep.city flight.dep.code
                  <FaArrowRightLong className="text-[14px] mx-5" />
                  flight.arr.city flight.arr.code
                </div>
                <div>flight.dapdate</div>
              </div>
              <div>
                <button className="hs-button text-sm" id="changeFlight">
                  เปลี่ยนเที่ยวบิน
                </button>
              </div>
            </div>
            {/* //todo: pull from database */}
            <div className="p-8 rounded bg-white">
              <div className="flex">
                <div className="flex-1 flex">
                  <div className="w-[150px] flex flex-col gap-y-2 text-sm">
                    <p className="text-base">flight.airline</p>
                    <p>fliht.code</p>
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
                        <p className="font-bold">deptime</p>
                      </div>
                      <div className="relative flex flex-col items-start gap-y-5">
                        <p className="font-bold">arrtime</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-between ml-[40px]">
                      <div className="flex flex-col items-start">
                        <p className="font-bold mb-5">depCity (depCode)</p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="font-bold">arrCity (arrCode)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="desktop:flex-1 desktop:relative desktop:w-[55%] pt-8 desktop:p-0">
          <div className="sticky top-[82px]">
            <div className="bg-white rounded">
              <div className="hidden desktop:flex border-b-[0.5px] border-gray p-8">
                <p className="font-bold text-lg">รายละเอียดราคา</p>
              </div>
              {/* //todo: pull price from database */}
              <div className="px-8">
                <div className="desktop:pt-8 desktop:pb-15 desktop:pb-8">
                  <div className="hidden desktop:flex items-center justify-between">
                    {/* todo: add airport code to the search result */}
                    <div className="text-sm font-bold  flex justify-center items-center">
                      ขาไป (depcode
                      <FaArrowRightLong className="text-[14px] mx-2" />
                      arrcode)
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm font-bold">฿ price</p>
                    </div>
                  </div>
                </div>
                <div className="flex desktop:border-t-[0.5px] desktop:border-gray justify-between py-8">
                  <p className="font-bold text-lg">ราคารวม</p>
                  <div className="items-end">
                    <p className="font-bold text-base text-primary text-right mb-3">
                      ฿ total
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

      <main className="flex flex-col desktop:flex-row desktop:p-8 min-h-[50vh]">
        <section className="desktop:w-[75%] w-full">
          <div className="desktop:flex-1 flex-row desktop:mr-8">
            <div className="flex items-center justify-between p-8 bg-white border-b-[0.5px] border-gray">
              <div>
                <p className="text-base mb-3">ข้อมูลติดต่อ</p>
              </div>
            </div>
            {/* //todo: pull from database */}
            <div className="p-1 rounded bg-white">
              <div className="flex">
                <div className="flex-1 flex">
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm">
                    <div className="field">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder=""
                        className="input-nav"
                      />
                      <label className="label-nav">Enter Email</label>
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col gap-y-2 text-sm">
                    <div className="field">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder=""
                        className="input-nav"
                      />
                      <label className="label-nav">Enter Contact Number</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {confirm && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex justify-center items-center">
          <div className="z-[10000] bg-[#d6dce5] border border-solid border-[#888] rounded-xl active-nav p-4">
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
              <Link href='order' className="bg-primary text-white flex justify-center items-center font-bold p-4 rounded-md hover:opacity-80" id="link-to-order">กลับไปหน้าคำสั่งทั้งหมด</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
