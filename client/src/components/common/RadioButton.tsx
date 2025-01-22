import React from "react";
import { LucideIcon } from "lucide-react";

interface IRadioButtonProps {
  checked: boolean;
  label: string;
  name: string;
  value: string;
  description: string;
  Icon: LucideIcon;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton({
  checked,
  label,
  name,
  value,
  description,
  Icon,
  changeHandler,
}: IRadioButtonProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={changeHandler}
        className="hidden"
      />
      <div
        className={`flex items-center justify-center w-5 h-5 border-2 rounded-full mr-2 ${
          checked ? "border-green-500" : "border-gray-400"
        }`}
      >
        {checked && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
      </div>
      <div className="flex items-center gap-1">
        <Icon color="#9CA3AF" size={32} />
        <div>
          <div>{label}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
      </div>
    </label>
  );
}
