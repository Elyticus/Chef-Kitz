import { useState } from "react";

export default function Footer() {
  const [isCount, setIsCount] = useState(0);

  function add() {
    setIsCount((prev) => prev + 1);
  }

  function subtract() {
    setIsCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  return (
    <footer>
      <button onClick={subtract}>-</button>
      <h1>{isCount}</h1>
      <button onClick={add}>+</button>
    </footer>
  );
}
