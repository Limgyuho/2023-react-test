import React, { useState } from "react";

export default function SetTimeOut() {
  const [num, setNum] = useState(0);

  const timeoutId = setTimeout(() => setNum(num + 1), 1000);

  const pause = () => clearTimeout(timeoutId);

  const resume = () => {
    setTimeout(() => setNum(num + 1), 1000);
  };

  return (
    <>
      숫자 : {num}
      <hr />
      <button onClick={pause}>일시정지</button>
      &nbsp;
      <button onClick={resume}>재개</button>
    </>
  );
}
