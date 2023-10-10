import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

export default function Navbar({ className }) {
  const {
    setAuthState,
    authState,
    logout,
    showForm,
    setShowForm,
    resetAppState,
  } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [errorUserName, setErrorUserName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPw, setErrorConfirmPw] = useState("");

  const [showLinks, setShowLinks] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
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
      setShowForm(!showForm);
      setShowLogin(true);
      setShowRegister(false);
    } else if (validation === "Registration") {
      setShowForm(!showForm);
      setShowRegister(true);
      setShowLogin(false);
    } else {
      setShowForm(!showForm);
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

  // todo: login and register

  const FormValidation = (e) => {
    e.preventDefault();
    // todo: login
    if (showLogin) {
      const data = {
        username: userName,
        password: password,
      };
      axios
        .post("http://localhost:3001/auth/login", data)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("accessToken", res.data.token);
            setAuthState({
              username: res.data.username,
              id: res.data.id,
              status: true,
            });
            setUserName("");
            setPassword("");
            setShowForm(false);
          } else if (res.data.error === "User Doesn't Exist") {
            setErrorUserName(res.data.error);
            setUserName("");
            setPassword("");
          } else if (
            res.data.error === "Wrong Username And Password Combination"
          ) {
            setErrorPassword(res.data.error);
            setUserName("");
            setPassword("");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // todo: register
    if (showRegister) {
      const data = {
        username: userName,
        password: password,
        password1: confirmPw,
      };
      axios
        .post("http://localhost:3001/auth", data)
        .then((res) => {
          if (res.data === "SUCCESS") {
            setShowForm(false);
            setConfirmPw("");
            setUserName("");
            setPassword("");
          } else if (res.data.error === "Username already exists") {
            setErrorUserName(res.data.error);
            setConfirmPw("");
            setUserName("");
            setPassword("");
          } else if (res.data.error === "Passwords do not match") {
            setErrorConfirmPw(res.data.error);
            setConfirmPw("");
            setUserName("");
            setPassword("");
          } else {
            console.log("An error occurred:", res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <nav className={`bg-white h-[67px] shadow-md ${className}`}>
      <div className="md:flex relative md:h-full md:p-4 md:item-center md:justify-between">
        <div className="flex items-center justify-between p-4 md:p-0">
          <Link
            href="/"
            id="link-homepage-logo"
            onClick={resetAppState}
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
            <li>
              <Link
                href="/"
                id="home"
                onClick={resetAppState}
                className="hover:opacity-80 md:relative md:after:block md:after:w-full md:after:h-[2px] md:after:bg-transparent md:after:absolute md:after:top-25 md:after:left-0 md:opacity-80 md:hover:after:bg-primary">
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link
                href="/flight"
                onClick={resetAppState}
                className="hover:opacity-80 md:relative md:after:block md:after:w-full md:after:h-[2px] md:after:bg-transparent md:after:absolute md:after:top-25 md:after:left-0 md:opacity-80 md:hover:after:bg-primary">
                เที่ยวบิน
              </Link>
            </li>
            {authState.status && (
              <>
                <li>
                  <Link
                    href="/flight/order"
                    onClick={resetAppState}
                    className="hover:opacity-80 md:relative md:after:block md:after:w-full md:after:h-[2px] md:after:bg-transparent md:after:absolute md:after:top-25 md:after:left-0 md:opacity-80 md:hover:after:bg-primary">
                    คำสั่งซื้อ
                  </Link>
                </li>
              </>
            )}

            <li>
              <button
                className={`font-bold bg-white md:p-1 ${
                  !authState.status
                    ? "cursor-pointer"
                    : "cursor-default hover:!opacity-100"
                }`}
                id="link-login"
                onClick={() => (!authState.status ? toggleForm("Login") : "")}>
                {!authState.status ? "เข้าสู่ระบบ" : authState.username}
              </button>
            </li>

            <li>
              <button
                id={`${!authState.status ? "link-registration" : "logout"}`}
                className={`${
                  !authState.status ? "!bg-primary" : "!bg-red-600"
                } text-white !flex justify-center items-center md:!w-[7rem]`}
                onClick={() =>
                  !authState.status ? toggleForm("Registration") : logout()
                }>
                {!authState.status ? "ลงทะเบียน" : "ออกจากระบบ"}
              </button>
            </li>
          </ul>

          {/* //TODO: Create Form Login and register */}
          {showForm && (
            <>
              <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex justify-center items-center">
                <form
                  className="z-[10000] w-[500px] bg-[#d6dce5] border border-solid border-[#888] rounded-xl active-nav p-4"
                  id="form-validation"
                  onSubmit={FormValidation}>
                  <div className="w-full flex justify-between items-center p-3">
                    <h2 className="flex justify-center items-center text-xl  font-bold">
                      {showLogin ? "Login" : "Register"}
                    </h2>
                    <span
                      id="close-form"
                      className="cursor-pointer hover:text-red-600 focus:text-red-600 -mt-5"
                      onClick={() => setShowForm(!showForm)}>
                      <CloseIcon color="text-primary" fontSize="small" />
                    </span>
                  </div>

                  <div className="w-full">
                    {/* //Todo: create login Form */}
                    {showLogin && (
                      <>
                        <div className="field">
                          <input
                            autoComplete="off"
                            id="username"
                            name="username"
                            value={userName}
                            onChange={(e) => {
                              setUserName(e.target.value);
                              setErrorUserName("");
                            }}
                            placeholder=""
                            className="input-nav"
                            required
                          />
                          <label className="label-nav">Enter Username</label>
                          <span className="text-red-600">{errorUserName}</span>
                        </div>

                        <div className="field">
                          <input
                            autoComplete="off"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrorPassword("");
                            }}
                            placeholder=""
                            className="input-nav"
                            required
                          />
                          <label className="label-nav">Enter Password</label>
                          <span className="text-red-600">{errorPassword}</span>
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
                              id="registration"
                              className="bg-transparent hover:text-red-600 visited:text-[#385285]">
                              สมัครตอนนี้
                            </a>
                          </span>
                        </div>
                      </>
                    )}

                    {/* //Todo: create register Form */}
                    {showRegister && (
                      <>
                        <div className="field">
                          <input
                            autoComplete="off"
                            id="username"
                            name="username"
                            value={userName}
                            onChange={(e) => {
                              setUserName(e.target.value);
                              setErrorUserName("");
                            }}
                            placeholder=""
                            className="input-nav"
                            required
                          />
                          <label className="label-nav">Enter Username</label>
                          <span className="text-red-600">{errorUserName}</span>
                        </div>

                        <div className="field">
                          <input
                            autoComplete="off"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrorPassword("");
                            }}
                            placeholder=""
                            className="input-nav"
                            required
                          />
                          <label className="label-nav">Enter Password</label>
                        </div>

                        <div className="field">
                          <input
                            autoComplete="off"
                            type="password"
                            name="password1"
                            value={confirmPw}
                            onChange={(e) => {
                              setConfirmPw(e.target.value);
                              setErrorConfirmPw("");
                            }}
                            placeholder=""
                            className="input-nav"
                            required
                          />
                          <label className="label-nav">Confirm Password</label>
                          <span className="text-red-600">{errorConfirmPw}</span>
                        </div>

                        <div className="p-5">
                          <button id="submit" className="w-full btn">
                            Register
                          </button>
                          <span className="float-right pb-5 cursor-pointer">
                            <a
                              onClick={() => toggleSwitch("Login")}
                              className="bg-transparent hover:text-red-600 visited:text-[#385285]"
                              id="go-login">
                              มีบัญชีอยู่แล้ว
                            </a>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
