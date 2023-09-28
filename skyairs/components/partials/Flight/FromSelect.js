import React from "react";

export default function FromSelect({
  show,
  toggleShow,
  select,
  changeValue,
  id,
  label,
  placeholder,textHeader,item
}) {
  
  return (
    <div className="relative py-1">
      <div
        className={`py-[10px] px-[15px] w-full min-h-[68px] border-[0.5px] border-solid ${
          show ? "border-red-600" : "border-[#d8d8d8]"
        } rounded-md`}
        onClick={toggleShow}
        id={`${id}`}>
        <label className="text-[#9a9a9a] text-xs block cursor-pointer mb-[10px]">
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          className="font-bold w-full block text-sm border-none outline-none cursor-pointer"
          value={select}
          readOnly
        />
      </div>

      {/* list */}
      {show && (
        <div className="absolute drop-shadow-md desktop:w-[234px] w-full desktop:mt-[5px] z-10">
          <div className="flex items-center justify-between rounded-t-md bg-[#f7f7f7] border-b-[0.5px] border-solid border-[#dedede] p-4">
            <div className="font-bold text-lg">{textHeader}</div>
            <button
              className="border-none bg-transparent cursor-pointer text-[200%]"
              id="close-search"
              onClick={toggleShow}>
              &times;
            </button>
          </div>

          {item.map((item, idx) => (
            <div
              className="bg-white rounded-b-md overflow-y-auto max-h-[410px] p-5 cursor-pointer hover:bg-zinc-100"
              key={item}
              id={item}
              onClick={() => {
                changeValue(item);
                toggleShow();
              }}>
              <div>{item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
