import React from "react";

export default function Select() {
  return (
    <select
      id="small"
      className="px-6 flex items-center text-sm bg-[#f8f7f7] hover:bg-[#f3f1f1] transition-all duration-150 ease-in-out py-3 rounded-full focus:outline-0"
    >
      <option defaultValue={undefined}>Choose lifespan</option>
      <option value="1 day">1 day</option>
      <option value="2 days">2 days</option>
      <option value="3 days">3 days</option>
      <option value="4 days">4 days</option>
      <option value="Unlimted">Unlimited</option>
    </select>
  );
}
