import { useEffect, useCallback, useState } from "react";

const Controls = ({
  keys,
  currentKey,
  setCurrentKey,
  selected,
  setSelected,
  showOptions,
}) => {
  const [keyPosition, setKeyPosition] = useState(0);
  const handleCheckboxChange = (event) => {
    setCurrentKey(event.target.value);
  };

  const handleClick = useCallback(() => {
    setSelected(selected === currentKey ? null : currentKey);
  }, [currentKey, selected, setSelected]);

  const handleKeydown = useCallback(
    (e) => {
      if (e.key === "Enter") handleClick();
      if (e.key === "ArrowRight") {
        let num = keyPosition + 1;
        if (num > keys.length - 1) num = 0;
        setKeyPosition(num);
      }
      if (e.key === "ArrowLeft") {
        let num = keyPosition - 1;
        if (num < 0) num = keys.length - 1;
        setKeyPosition(num);
      }
    },
    [handleClick, keys, keyPosition]
  );

  useEffect(() => {
    setCurrentKey(keys[keyPosition].name);
  }, [keys, keyPosition, setCurrentKey]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div className="controls">
      <p>{currentKey}</p>
      <div className="dots">
        {keys.map((key, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={key.name}
              checked={currentKey === key.name ? true : false}
              onChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
      <button onClick={handleClick}>
        {selected === currentKey ? "x" : "select"}
      </button>
      {showOptions && selected === currentKey && (
        <div className="options">
          <button>option 1</button>
          <button>option 2</button>
          <button>option 3</button>
        </div>
      )}
    </div>
  );
};

export default Controls;
