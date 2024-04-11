"use client";

import { useFormStatus } from "react-dom";

export default function Button({
  children,
  onclick,
  withoutMarginTop,
  formButton,
  disabled,
}) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={disabled || (formButton && pending)}
      onClick={onclick}
      className={`bg-white rounded-3xl border-threads-gray-light w-full 
      disabled:bg-opacity-50 disabled:cursor-not-allowed
    ${!withoutMarginTop && "mt-4"} p-4 hover:bg-gray-300 duration-150`}
    >
      {children}
    </button>
  );
}
