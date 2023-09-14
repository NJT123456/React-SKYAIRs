import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../../context"
import { BsRepeat } from "react-icons/bs"
import CityData from "../../data/city"

export const FromSearch = ({
  showFromList,
  showGoList,
  toggleShowFromList,
  toggleShowGoList,
}) => {
  const {
    wordFrom,
    setWordFrom,
    wordGo,
    setWordGo,
    setValueFrom,
    setValueGo,
    valueFrom,
    valueGo,
  } = useGlobalContext()
  const [Switch, setSwitch] = useState(false)
  const [filterFrom, setFilterFrom] = useState([])
  const [filterGo, setFilterGo] = useState("")

  const toggleSwitch = () => {
    setWordFrom(wordGo)
    setWordGo(wordFrom)
    setSwitch(!Switch)
    setValueFrom(valueGo)
    setValueGo(valueFrom)
  }

  const ChangeValueFrom = (e, value) => {
    setWordFrom(e.target.textContent)
    setValueFrom(value)
    toggleShowFromList()
  }

  const ChangeValueGo = (e, value) => {
    setWordGo(e.target.textContent)
    setValueGo(value)
    toggleShowGoList()
  }

  useEffect(() => {
    const resultFrom = CityData.filter((item) =>
      item.city.toLowerCase().includes(wordFrom.toLowerCase())
    )
    setFilterFrom(resultFrom)

    const resultGo = CityData.filter((item) =>
      item.city.toLowerCase().includes(wordGo.toLowerCase())
    )
    setFilterGo(resultGo)
  }, [wordFrom, wordGo])

  console.log(valueFrom, valueGo)

  return (
    <div className="search">
      {/* from */}
      <div className="swap">
        <div className="relative-flight">
          <div
            className={`${
              showFromList ? "from-flight active-flight" : "from-flight"
            } `}
            onClick={toggleShowFromList}
            id="from-flight">
            <label className="label-from-flight">จาก</label>
            <input
              type="text"
              placeholder="ต้นทาง"
              id="from-flight-input"
              autoComplete="off"
              className="input-from-flight"
              value={wordFrom}
              onChange={(e) => setWordFrom(e.target.value)}
            />
          </div>
          {/* list */}
          {showFromList && (
            <div
              id="option-from-flight"
              role="listbox"
              className="option-from-flight-list">
              <div className="head-select-from-flight">
                <div className="text-select-from-flight">เลือกปลายทาง</div>
                <button
                  className="close-flight"
                  type="button"
                  id="close-flight"
                  onClick={toggleShowFromList}>
                  &times;
                </button>
              </div>

              {filterFrom.map((item, idx) => (
                <div
                  className="search-from-flight"
                  id={item.code}
                  key={idx}
                  onClick={(e) => ChangeValueFrom(e, item.code)}>
                  <div className="output-search-from-flight">{item.city}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* go */}
        <div className="relative-flight">
          <div
            className={`${
              showGoList ? "from-flight active-flight" : "from-flight"
            } `}
            onClick={toggleShowGoList}
            id="go-flight">
            <label className="label-from-flight">ไปยัง</label>
            <input
              type="text"
              placeholder="ปลายทาง"
              autoComplete="off"
              className="input-from-flight"
              value={wordGo}
              onChange={(e) => setWordGo(e.target.value)}
            />
          </div>
          {/* list */}
          {showGoList && (
            <div
              id="option-from-flight"
              role="listbox"
              className="option-from-flight-list">
              <div className="head-select-from-flight">
                <div className="text-select-from-flight">เลือกปลายทาง</div>
                <button
                  className="close-flight"
                  type="button"
                  id="close-flight"
                  onClick={toggleShowGoList}>
                  &times;
                </button>
              </div>
              {filterGo.map((item,idx) => (
                <div
                  className="search-from-flight"
                  id={item.code}
                  key={idx}
                  onClick={(e) => ChangeValueGo(e, item.code)}>
                  <div className="output-search-from-flight">{item.city}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* switch */}
      <button
        className={`switch-button ${Switch ? "active-switch" : ""}`}
        onClick={toggleSwitch}
        id="switch-button-flight">
        <div className="icon">
          <BsRepeat className="svg-inline" />
        </div>
      </button>
    </div>
  )
}
