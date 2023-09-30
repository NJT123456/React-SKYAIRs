import React from "react";

export default function FromSearch({
  id,
  showSearchList,
  toggleShowList,
  label,
  placeholder,
  value,
  changeValueSearch,
  FilterList,
  changeValue,
}) {
  return (
    <>
      <div
        id={`${id}`}
        className={`py-[10px] px-[15px] desktop:w-[280px] w-full cursor-pointer border border-solid rounded-md m-0 ${
          showSearchList ? "border-red-600" : "border-[#d8d8d8]"
        }`}
        onClick={toggleShowList}>
        <label className="text-[#9a9a9a] text-xs block cursor-pointer mb-[10px]">
          {label}
        </label>
        <input
          type="text"
          placeholder={`${placeholder}`}
          autoComplete="off"
          className="font-bold w-full block text-sm border-none outline-none"
          value={value}
          onChange={(e) => changeValueSearch(e.target.value)}
        />
      </div>

      {/* list */}
      {showSearchList && (
        <div className="absolute drop-shadow-md desktop:w-[555px] w-full desktop:mt-[5px] z-10">
          <div className="flex items-center justify-between rounded-t-md bg-[#f7f7f7] border-b-[0.5px] border-solid border-[#dedede] p-4">
            <div className="font-bold text-lg">เลือกปลายทาง</div>
            <button
              className="border-none bg-transparent cursor-pointer text-[200%]"
              id="close-search"
              onClick={toggleShowList}>
              &times;
            </button>
          </div>

          {FilterList.map((item, idx) => (
            <div
              className="bg-white rounded-b-md overflow-y-auto max-h-[410px] p-5 cursor-pointer hover:bg-zinc-100"
              key={`code-${idx}`}
              id={item.code}
              onClick={()=>changeValue(item.city, item.code)}>
              <div>{item.city}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
