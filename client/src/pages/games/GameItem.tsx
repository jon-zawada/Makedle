import React from "react";
import { Game } from "../../types/types";

export default function GameItem({ id, name, image }: Game) {
  return (
    <div className="relative flex flex-col gap-2 group hover:cursor-pointer">
      <img
        src={image || `https://picsum.photos/id/${id}/5000/3333`}
        className="block w-full h-[250px] object-cover transition-[border-radius,opacity] duration-200 rounded-xl opacity-85 group-hover:opacity-100"
      />
      <div className="absolute p-2 inset-0 flex items-end justify-center text-white text-lg font-bold rounded-xl hover:underline hover:text-green-500">
        {name}
      </div>
      <div className="absolute inset-0 rounded-xl outline-none group-hover:outline group-hover:outline-4 group-hover:outline-green-500 pointer-events-none"></div>
    </div>
  );
}
