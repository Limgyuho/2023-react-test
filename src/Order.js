import React, { useState, useMemo, useCallback } from "react";

function OrderMainFood({ mainFoodCount, setMainFoodCount }) {
  return (
    <>
      <h2>메인 (수량 : {mainFoodCount})</h2>
      <div>
        <button onClick={() => setMainFoodCount(mainFoodCount + 1)}>
          증가
        </button>
        <button
          onClick={() =>
            setMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)
          }
        >
          감소
        </button>
      </div>
    </>
  );
}

const MemoizedOrderMainFood = React.memo(OrderMainFood);

function OrderOptions({
  selectedCount,
  options,
  toggleAllChecked,
  btnAllChecked,
  optionCheckeds,
  toggleOptionCheck,
}) {
  return (
    <>
      <h2>
        옵션 ({selectedCount} / {options.length})
      </h2>

      <label>
        <input
          type="checkbox"
          checked={btnAllChecked}
          onChange={toggleAllChecked}
        />
        전체선택
      </label>

      <ul>
        {options.map((option, index) => (
          <li style={{ userSelect: "none", cursor: "pointer" }} kye={option}>
            <label>
              <input
                type="checkbox"
                checked={optionCheckeds[index]}
                onChange={() => toggleOptionCheck(index)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

const MemoizedOrderOptions = React.memo(OrderOptions);

function OderDelivery({ deliveryType, setDeliveryType }) {
  return (
    <>
      <h2>배달옵션</h2>
      <label>
        <input
          type="radio"
          name="delivery-type"
          checked={deliveryType == "직접수령"}
          onChange={() => setDeliveryType("직접수령")}
        />
        직접수령
      </label>
      <label>
        <input
          type="radio"
          name="delivery-type"
          checked={deliveryType == "배달"}
          onChange={() => setDeliveryType("배달")}
        />
        배달
      </label>
    </>
  );
}

const MemoizedOderDelivery = React.memo(OderDelivery);

export default function Order() {
  const [mainFoodCount, setMainFoodCount] = useState(1);

  const options = [
    "사이다 1.5",
    "랜치소스",
    "머스타드 소스",
    "마라 소스",
    "스윗 칠리 소스",
    "레몬에이드",
  ];

  const [optionCheckeds, setOptionCheckeds] = useState(
    new Array(options.length).fill(false)
  );

  const toggleOptionCheck = useCallback(
    (index) => {
      const newOptionCheckeds = optionCheckeds.map((el, _index) =>
        _index == index ? !el : el
      );
      setOptionCheckeds(newOptionCheckeds);
    },
    [optionCheckeds]
  );

  const btnAllChecked = useMemo(
    () => optionCheckeds.every((el) => el),
    [optionCheckeds]
  );
  const selectedCount = useMemo(
    () => optionCheckeds.filter((el) => el).length,
    [optionCheckeds]
  );

  const toggleAllChecked = useCallback(() => {
    if (btnAllChecked) {
      // 전부 체크를 해제 해야함
      const newOptionCheckeds = optionCheckeds.map((el) => false);
      setOptionCheckeds(newOptionCheckeds);
    } else {
      // 전부 체크를 해야함
      const newOptionCheckeds = optionCheckeds.map((el) => true);
      setOptionCheckeds(newOptionCheckeds);
    }
  }, [optionCheckeds]);

  const [deliveryType, setDeliveryType] = useState("직접수령");

  return (
    <>
      <h1>음식주문</h1>

      <MemoizedOrderMainFood
        setMainFoodCount={setMainFoodCount}
        mainFoodCount={mainFoodCount}
      />
      <MemoizedOrderOptions
        selectedCount={selectedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        btnAllChecked={btnAllChecked}
        optionCheckeds={optionCheckeds}
        toggleOptionCheck={toggleOptionCheck}
      />
      <MemoizedOrderOptions
        selectedCount={selectedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        btnAllChecked={btnAllChecked}
        optionCheckeds={optionCheckeds}
        toggleOptionCheck={toggleOptionCheck}
      />
      <MemoizedOderDelivery
        deliveryType={deliveryType}
        setDeliveryType={setDeliveryType}
      />
    </>
  );
}
