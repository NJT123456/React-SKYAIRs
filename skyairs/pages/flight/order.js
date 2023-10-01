import Navbar from "@/components/partials/Navbar";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

export default function Order() {
  return (
    <div>
      <Navbar className={"sticky top-0 z-30"} />

      <section className="w-full px-4 pt-5 pb-6">
        <div className="flex flex-col gap-y-[10px] ">
          <div className="card-container">
            <div className="da">
              <div className="flex flex-col desktop:pb-0 pb-4">
                <div className="time-data">
                  <p className="text-base font-bold">data.origin_city</p>
                  <div className="icon-go-return text-base font-bold">
                    <BsThreeDots className="arrow" />
                    <BsThreeDots className="arrow" />
                    <FaChevronRight className="arrow-right" />
                  </div>
                  <div className="des">
                    <p className="text-base font-bold">data-destination-city</p>
                  </div>
                </div>

                <div className="flex flex-col pt-4 items-center justify-center desktop:items-start">
                  <p>REF NO : data</p>
                  <p>FLIGHT NUMBER : data</p>
                  <p>ชั้นโดยสาร : data</p>
                  <p>จำนวนเงินที่ชำระ : data บาท</p>
                </div>
              </div>

              <div className="flex flex-col h-[120px]">
                <div className="time-diff">
                  <p className="text-base font-bold">รายละเอียดคำสั่งซื้อ</p>
                </div>

                <div className="flex flex-col pt-4">
                  <p>วันที่จอง : data</p>
                  <p>สถานะการจอง : data</p>
                </div>
              </div>

              <div className="flex desktop:flex-col justify-center items-center gap-y-2">
                <button className="select-price !w-[132px]">
                  <span>e-Ticket</span>
                </button>
                <button className="select-price !bg-red-600 !w-[132px] hover:!bg-red-800">
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
