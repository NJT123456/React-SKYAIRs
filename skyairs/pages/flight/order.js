import Navbar from "@/components/partials/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "@/components/helpers/AuthContext";
import { saveAs } from "file-saver";

export default function Order() {
  const { formatDate } = useContext(AuthContext);
  const [listOrder, setListOrder] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const button = [
    { button: "Cancel", color: "!bg-red-600", hoverButton: "!bg-red-800" },
    { button: "e - Ticket" },
  ];

  const url = `http://localhost:3001/order`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        });
        setListOrder(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    if (status === "CONFIRMED") {
      return "text-green-600";
    } else if (status === "CANCELLED") {
      return "text-red-600";
    } else {
      return "";
    }
  };

  const capitalizeStatus = (status) => {
    if (!status) {
      return "";
    }

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // *updataStatus
  const urlStatus = `http://localhost:3001/order/updateStatus`;

  const updateStatus = (status, value) => {
    axios
      .post(
        urlStatus,
        {
          status: status,
          ref_no: value,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === "Update Success") {
          // * update listOrder
          const updateListOrder = listOrder.map((item) => {
            if (item.ref_no === value) {
              return { ...item, status: "CANCELLED" };
            }
            return item;
          });
          setListOrder(updateListOrder);
        }

        if (status === "e - Ticket") {
          if (res.data) {
            const data = {
              ref_no: res.data.ref_no,
              booking_date: res.data.booking_date,
              flight_departdate: res.data.flight_departdate,
              seat_class: res.data.seat_class,
              passenger: res.data.passenger,
              status: res.data.status,
              flight: res.data.flight,
              flight_fare: res.data.flight_fare,
              total_fare: res.data.total_fare,
            };
            axios
              .post(`http://localhost:3001/order/createPdf`, data)
              .then((res) => {
                axios
                  .get(`http://localhost:3001/order/fetchPdf`, {
                    responseType: "blob",
                  })
                  .then((res) => {
                    const pdfBlob = new Blob([res.data], {
                      type: "application/pdf",
                    });

                    saveAs(pdfBlob, `order_${value}.pdf`);
                  });
              });
          }
        }
      });
  };

  return (
    <div>
      <Navbar className={"sticky top-0 z-30"} />

      <div className="px-4 pb-6">
        {listOrder.map((value, idx) => (
          <section className="w-full pt-5" key={idx}>
            <div className="flex flex-col gap-y-[10px] ">
              <div className="card-container">
                <div className="da">
                  <div className="flex flex-col desktop:pb-0 pb-4">
                    <div className="time-data">
                      <p
                        className="text-base font-bold"
                        key={`origin-city-${idx}`}>
                        {value.flight.origin.city_thai}
                      </p>
                      <div className="icon-go-return text-base font-bold">
                        <BsThreeDots className="arrow" />
                        <BsThreeDots className="arrow" />
                        <FaChevronRight className="arrow-right" />
                      </div>
                      <div className="des">
                        <p
                          className="text-base font-bold"
                          key={`destination-city-${idx}`}>
                          {value.flight.destination.city_thai}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col pt-4 items-center justify-center desktop:items-start">
                      <p key={`ref-no-${idx}`}>REF NO : {value.ref_no}</p>
                      <p key={`flight-num-${idx}`}>
                        FLIGHT NUMBER : {value.flight.fnumber}
                      </p>
                      <p key={`seat-${idx}`}>ชั้นโดยสาร : {value.seat_class}</p>
                      <p key={`total-${idx}`}>
                        จำนวนเงินที่ชำระ : {value.total_fare} บาท
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col h-[120px]">
                    <div className="time-diff">
                      <p className="text-base font-bold">
                        รายละเอียดคำสั่งซื้อ
                      </p>
                    </div>
                    <div className="flex flex-col pt-4">
                      <p key={`booking-${idx}`}>
                        วันที่จอง :{" "}
                        {formatDate(value.booking_date, "DD MMM YYYY")}
                      </p>
                      <p>
                        สถานะการจอง :{" "}
                        <span
                          key={`status-${idx}`}
                          className={`${getStatusColor(value.status)}`}>
                          {capitalizeStatus(value.status)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex desktop:flex-col justify-center items-center gap-y-2">
                    {value.status !== "CANCELLED" &&
                      button.map((btn, idx) => {
                        return (
                          <button
                            className={`select-price ${btn.color} hover:${btn.hoverButton} !w-[132px] `}
                            key={idx}
                            onClick={() =>
                              updateStatus(btn.button, value.ref_no)
                            }>
                            {btn.button}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
