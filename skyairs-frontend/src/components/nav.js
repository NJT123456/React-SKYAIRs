import React, { useEffect, useRef, useState } from "react"
import "../static/css/nav.css"
import Axios from "axios"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context"

const Navbar = ({classNameSticky}) => {
  const { showForm, setShowForm, success, setSuccess } = useGlobalContext()
  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPw, setConfirmPw] = useState("")

  const [errorUserName, setErrorUserName] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirmPw, setErrorConfirmPw] = useState("")

  const [userNameColor, setUserNameColor] = useState("")
  const [passwordColor, setPasswordColor] = useState("")
  const [confirmPwColor, setConfirmPwColor] = useState("")

  const toggleForm = () => {
    setShowForm(!showForm)
    setShowLogin(true)
    setShowRegister(false)
    setUserName("")
    setPassword("")
    setConfirmPw("")
    setErrorUserName("")
    setErrorPassword("")
    setErrorConfirmPw("")
    setUserNameColor("")
    setPasswordColor("")
    setConfirmPwColor("")
  }
  const toggleLogin = () => {
    setShowLogin(true)
    setShowRegister(false) // เมื่อกด Login ให้ซ่อนส่วนของ Register
  }
  const toggleRegister = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  const handleLogout = () => {
    setSuccess(false)
  }

  const FormValidation = (e) => {
    e.preventDefault()

    if (showRegister) {
      Axios.post("http://localhost:3001/register", {
        username: userName,
        password: password,
        confirmPw: confirmPw,
      })
        .then((res) => {
          console.log("Response from server:", res.data)
          if (res.data === "User registered successfully") {
            setShowForm(false)
          } else if (res.data === "This username has already been taken") {
            setErrorUserName(res.data)
            setUserNameColor("red")
            setConfirmPw("")
            setUserName("")
            setPassword("")
          } else if (res.data === "Passwords do not match") {
            setErrorConfirmPw(res.data)
            setConfirmPwColor("red")
            setConfirmPw("")
            setUserName("")
            setPassword("")
          } else {
            console.log("An error occurred:", res.data)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (showLogin) {
      Axios.post("http://localhost:3001/login", {
        username: userName,
        password: password,
      })
        .then((res) => {
          if (res.data === "Login successful") {
            setSuccess(true)
            setShowForm(false)
          } else if (res.data === "Invalid username") {
            setErrorUserName(res.data)
            setUserNameColor("red")
            setUserName("")
            setPassword("")
          } else if (res.data === "Incorrect password") {
            setErrorPassword(res.data)
            setPasswordColor("red")
            setUserName("")
            setPassword("")
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <nav className={`nav-header ${classNameSticky}`}>
      <div className="nav">
        <h1 className="font">
          <Link to="/" id="logo-homepage">
            SKYAIRs
          </Link>
        </h1>
        <ul className="link" id="flight-homepage">
          <li>
            <Link to="/">เที่ยวบิน</Link>
          </li>
          {success && (
            <>
              <li>
                <Link to="/search" id="search-homepage">
                  คำสั่งซื้อ
                </Link>
              </li>
              <li>{userName}</li>
            </>
          )}
          <li>
            <button
              className="btn font1"
              onClick={success ? handleLogout : toggleForm}
              id="login-logout">
              {success ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
        {showForm && (
          <>
            <div className="modal">
              <form
                action=""
                className="modal-content active-nav"
                onSubmit={FormValidation}
                id="formvalidation">
                <div className="head-container">
                  <span className="close" onClick={toggleForm} id="close-form">
                    &times;
                  </span>
                  <h2 className="login">{showLogin ? "Login" : "Register"}</h2>
                </div>
                <div className="container">
                  {showLogin && (
                    <>
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Enter Username"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value)
                            setErrorUserName("")
                          }}
                          name="username"
                          className="input-nav"
                          id="username"
                          required
                        />
                        <label
                          data-content="Enter Username"
                          className="label-nav">
                          <span className="hidden--visually">
                            Enter Username
                          </span>
                        </label>
                        <span>
                          <small style={{ color: userNameColor }}>
                            {errorUserName}
                          </small>
                        </span>
                      </div>

                      <div className="input-field">
                        <input
                          type="password"
                          placeholder="Enter Password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            setErrorPassword("")
                          }}
                          className="input-nav"
                          id="password"
                          required
                        />
                        <label
                          data-content="Enter Password"
                          className="label-nav">
                          <span className="hidden--visually">
                            Enter Password
                          </span>
                        </label>
                        <span>
                          <small style={{ color: passwordColor }}>
                            {errorPassword}
                          </small>
                        </span>
                      </div>

                      <div className="btn-container">
                        <button
                          className="btn font1 btn-login"
                          type="submit"
                          id="submit">
                          Login<a href="#"></a>
                        </button>
                        <span className="signin">
                          <a onClick={toggleRegister}>สมัครตอนนี้</a>
                        </span>
                      </div>
                    </>
                  )}

                  {showRegister && (
                    <>
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Enter Username"
                          name="username-register"
                          className="input-nav"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value)
                            setErrorUserName("")
                          }}
                          id="username-register"
                          required
                        />
                        <label
                          data-content="Enter Username"
                          className="label-nav">
                          <span className="hidden--visually">
                            Enter Username
                          </span>
                        </label>
                        <span>
                          <small style={{ color: userNameColor }}>
                            {errorUserName}
                          </small>
                        </span>
                      </div>

                      <div className="input-field">
                        <input
                          type="password"
                          placeholder="Enter Password"
                          name="password1"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            setErrorPassword("")
                          }}
                          className="input-nav"
                          id="password1-register"
                          required
                        />
                        <label
                          data-content="Enter Password"
                          className="label-nav">
                          <span className="hidden--visually">
                            Enter Password
                          </span>
                        </label>
                      </div>

                      <div className="input-field">
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          name="password2"
                          value={confirmPw}
                          onChange={(e) => {
                            setConfirmPw(e.target.value)
                            setErrorConfirmPw("")
                          }}
                          className="input-nav"
                          id="password2"
                          required
                        />
                        <label
                          data-content="Confirm Password"
                          className="label-nav">
                          <span className="hidden--visually">
                            Confirm Password
                          </span>
                        </label>
                        <span>
                          <small style={{ color: confirmPwColor }}>
                            {errorConfirmPw}
                          </small>
                        </span>
                      </div>
                      <div className="btn-container">
                        <button
                          className="btn font1 btn-login"
                          type="submit"
                          id="submit-register">
                          Register<a href="#"></a>
                        </button>
                        <span className="register">
                          <a onClick={toggleLogin} id="switch-login">
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
    </nav>
  )
}

export default Navbar
