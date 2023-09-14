import { useGlobalContext } from "../../context"
import React from "react"

const SeatClassCom = ({ showSeatClass, toggleShowSeatClass }) => {
  const { SeatClass, setSeatClass } = useGlobalContext()

  return (
    <div className="relative-flight">
      <div
        className={`${
          showSeatClass ? "seat-flight active-flight" : "seat-flight"
        } `}
        onClick={toggleShowSeatClass}>
        <label htmlFor="" id="seat-flight" className="label-seat-flight">
          ชั้นโดยสาร
        </label>
        <input
          type="text"
          placeholder="ประเภทชั้นโดยสาร"
          id="seat-flight-input"
          autoComplete="off"
          className="input-seat-flight"
          value={SeatClass}
        />
      </div>
      {/* list */}
      {showSeatClass && (
        <div
          id="option-seat-flight"
          role="listbox"
          className="option-seat-flight-list">
          <div className="head-select-seat-flight">
            <div className="text-select-seat-flight">เลือกประเภทชั้นโดยสาร</div>
            <button
              className="close-flight"
              type="button"
              id="close-flight"
              onClick={toggleShowSeatClass}>
              &times;
            </button>
          </div>
          <div
            className="search-seat-flight"
            onClick={(e) => {
              setSeatClass(e.target.textContent)
              toggleShowSeatClass()
            }}>
            <div className="output-search-seat-flight" value="Economy">
              Economy
            </div>
          </div>
          <div
            className="search-seat-flight"
            onClick={(e) => {
              setSeatClass(e.target.textContent)
              toggleShowSeatClass()
            }}>
            <div className="output-search-seat-flight" value="First">
              First
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SeatClassCom
