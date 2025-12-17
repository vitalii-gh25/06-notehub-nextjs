import { useState, useEffect } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value?: string; // для контролю, якщо треба
  defaultValue?: string;
  onChange: (value: string) => void;
}

export default function SearchBox({
  value,
  defaultValue = "",
  onChange,
}: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(defaultValue);

  // синхронізація лише якщо value змінився
  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      // відкладено через setTimeout, щоб уникнути каскаду
      const id = setTimeout(() => setLocalValue(value), 0);
      return () => clearTimeout(id);
    }
  }, [value, localValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder="Search notes"
      className={css.input}
    />
  );
}
