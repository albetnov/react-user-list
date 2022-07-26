import { useEffect, useState } from "react";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const rightHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const leftHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", rightHandler);
    window.addEventListener("keyup", leftHandler);

    return () => {
      window.removeEventListener("keydown", rightHandler);
      window.removeEventListener("keyup", leftHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export default useKeyPress;
