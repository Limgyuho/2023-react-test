import React, { useState } from "react";

export default function Popup() {
  const border = "10px solid red";
  const [popupVisible, setPopupVisible] = useState(true);

  return (
    <>
      <button onClick={() => setPopupVisible(!popupVisible)}>
        팝업{popupVisible ? "닫기" : "열기"}
      </button>
      <hr />
      {`popupVisible : ${popupVisible}`}
      {popupVisible && <div style={{ width: 100, height: 100, border }}></div>}
      <button className="btn text-xl">Button</button>
      <img src="https://picsum.photos/id/200/400/400" />
      <img src="https://picsum.photos/id/201/400/400" />
    </>
  );
}
