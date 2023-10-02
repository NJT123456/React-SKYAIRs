import React from "react";
import { CircularProgress } from "react-cssfx-loading";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <CircularProgress color='#247bb6' width='6rem' height='6rem' />
    </div>
  );
}
