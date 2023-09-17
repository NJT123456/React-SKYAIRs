import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Navbar({ alternate, className, showNavigationLinks }) {
  const link = [
    { text: "หน้าแรก", path: "/" },
    { text: "เที่ยวบิน", path: "/flight" },
    { text: "คำสั่งซื้อ", path: "/order" },
  ];
  const [showLinks, setShowLinks] = useState(false);
  const [showFrom, setShowFrom] = useState(true);
  const navToggle = useRef(null);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.clientHeight + 40;
    if (showLinks) {
      navToggle.current.classList.toggle("is-active");
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      navToggle.current.classList.remove("is-active");
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  return (
    <nav
      className={`bg-white h-[67px] ${className}`}>
      <div className={`md:flex relative md:h-full md:p-4 md:item-center md:justify-between ${!showNavigationLinks ? 'justify-between' : ''}`}>
        <div className="flex items-center justify-between p-4 md:p-0">
          <Link
            href="/"
            className="flex items-center text-[3rem] font-navbar italic font-bold">
            SKYAIRs
          </Link>

          <div
            className="navbar__toggle md:hidden cursor-pointer"
            ref={navToggle}
            onClick={() => {
              setShowLinks(!showLinks);
            }}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>

        <div
          className="md:flex md:justify-center md:items-center h-0 w-full md:w-auto bg-white overflow-hidden transition-all md:!h-auto"
          ref={linksContainerRef}>
          <ul className="link px-4 md:flex-row flex flex-col md:space-x-8 md:mt-0" ref={linksRef}>
            {link.map((linkItem, key) => {
              return (
                <li key={key}>
                  <Link href={linkItem.path} className="hover:opacity-80 md:relative md:after:block md:after:w-full md:after:h-[2px] md:after:bg-transparent md:after:absolute md:after:top-25 md:after:left-0 md:opacity-80 md:hover:after:bg-primary">{linkItem.text}</Link>
                </li>
              );
            })}

            <li>
              <button className="font-bold bg-white md:p-1">เข้าสู่ระบบ</button>
            </li>
            <li>
              <button className="!bg-primary text-white !flex justify-center items-center md:!w-[7rem]">
                ลงทะเบียน
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
