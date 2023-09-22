import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar({ className, showNavigationLinks }) {
  const link = [
    { text: "หน้าแรก", path: "/", id: "homepage" },
    { text: "เที่ยวบิน", path: "/flight", id: "flight" },
    { text: "คำสั่งซื้อ", path: "/flight/order", id: "order" },
  ];
  const [showLinks, setShowLinks] = useState(false);
  const [showFrom, setShowFrom] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
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

  const toggleForm = (validation) => {
    if (validation === "Login") {
      setShowFrom(!showFrom);
      setShowLogin(true);
      setShowRegister(false);
    } else if (validation === "Registration") {
      setShowFrom(!showFrom);
      setShowRegister(true);
      setShowLogin(false);
    } else {
      setShowFrom(!showFrom);
    }
  };

  const toggleSwitch = (validation) => {
    if (validation === "Login") {
      setShowLogin(true);
      setShowRegister(false);
    } else if (validation === "Registration") {
      setShowRegister(true);
      setShowLogin(false);
    }
  };

  return (
    <nav className={`bg-white h-[67px] shadow-md ${className}`}>
      <div
        className={`md:flex relative md:h-full md:p-4 md:item-center md:justify-between ${
          !showNavigationLinks ? "justify-between" : ""
        }`}>
        <div className="flex items-center justify-between p-4 md:p-0">
          <Link
            href="/"
            id="link-homepage-logo"
            className="flex items-center text-[3rem] font-navbar italic font-bold">
            SKYAIRs
          </Link>

          <div
            className="navbar__toggle md:hidden cursor-pointer"
            id="bar"
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
          <ul
            className="link px-4 md:flex-row flex flex-col md:space-x-8 md:mt-0"
            ref={linksRef}>
            {link.map((linkItem, key) => {
              return (
                <li key={key}>
                  <Link
                    href={linkItem.path}
                    id={`link-${linkItem.id}`}
                    className="hover:opacity-80 md:relative md:after:block md:after:w-full md:after:h-[2px] md:after:bg-transparent md:after:absolute md:after:top-25 md:after:left-0 md:opacity-80 md:hover:after:bg-primary">
                    {linkItem.text}
                  </Link>
                </li>
              );
            })}

            <li>
              <button
                className="font-bold bg-white md:p-1"
                id="link-login"
                onClick={() => {
                  toggleForm("Login");
                }}>
                เข้าสู่ระบบ
              </button>
            </li>
            <li>
              <button
                id="link-registration"
                className="!bg-primary text-white !flex justify-center items-center md:!w-[7rem]"
                onClick={() => toggleForm("Registration")}>
                ลงทะเบียน
              </button>
            </li>
          </ul>

          {/* //TODO: Create From Login and register */}
          {showFrom && (
            <>
              <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex justify-center items-center">
                <Formik>
                  <Form
                    className="z-[10000] w-[500px] bg-[#d6dce5] border border-solid border-[#888] rounded-xl active-nav p-4"
                    id="from-validation">
                    <div className="w-full flex justify-between items-center p-3">
                      <h2 className="flex justify-center items-center text-xl  font-bold">
                        {showLogin ? "Login" : "Register"}
                      </h2>
                      <span
                        id="close-from"
                        className="cursor-pointer hover:text-red-600 focus:text-red-600 -mt-5"
                        onClick={() => setShowFrom(!showFrom)}>
                        <CloseIcon color="text-primary" fontSize="small" />
                      </span>
                    </div>

                    <div className="w-full">
                      {/* //Todo: create login from */}
                      {showLogin && (
                        <>
                          <div className="field">
                            <Field
                              autoComplete="off"
                              id="username"
                              name="username"
                              placeholder=""
                              className="input-nav"
                            />
                            <hr className="hr" />
                            <label className="label-nav">Enter Username</label>
                            <ErrorMessage name="username" component="span" />
                          </div>

                          <div className="field">
                            <Field
                              autoComplete="off"
                              type="password"
                              id="password"
                              name="password"
                              placeholder=""
                              className="input-nav"
                            />
                            <label className="label-nav">Enter Password</label>
                            <ErrorMessage name="password" component="span" />
                          </div>

                          <div className="p-5">
                            <button
                              type="submit"
                              id="submit"
                              className="w-full btn">
                              Login
                            </button>
                            <span className="float-right pb-5 cursor-pointer">
                              <a
                                onClick={() => toggleSwitch("Registration")}
                                className="bg-transparent hover:text-red-600 visited:text-[#385285]">
                                สมัครตอนนี้
                              </a>
                            </span>
                          </div>
                        </>
                      )}

                      {/* //Todo: create register from */}
                      {showRegister && (
                        <>
                          <div className="field">
                            <Field
                              autoComplete="off"
                              id="username"
                              name="username"
                              placeholder=""
                              className="input-nav"
                            />
                            <label className="label-nav">Enter Username</label>
                            <ErrorMessage name="username" component="span" />
                          </div>

                          <div className="field">
                            <Field
                              autoComplete="off"
                              type="password"
                              name="password1"
                              placeholder=""
                              className="input-nav"
                            />
                            <label className="label-nav">Enter Password</label>
                          </div>

                          <div className="field">
                            <Field
                              autoComplete="off"
                              type="password"
                              name="password2"
                              placeholder=""
                              className="input-nav"
                            />
                            <label className="label-nav">
                              Confirm Password
                            </label>
                            <ErrorMessage name="password2" component="span" />
                          </div>

                          <div className="p-5">
                            <button id="submit" className="w-full btn">
                              Register
                            </button>
                            <span className="float-right pb-5 cursor-pointer">
                              <a
                                onClick={() => toggleSwitch("Login")}
                                className="bg-transparent hover:text-red-600 visited:text-[#385285]">
                                มีบัญชีอยู่แล้ว
                              </a>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </Form>
                </Formik>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
