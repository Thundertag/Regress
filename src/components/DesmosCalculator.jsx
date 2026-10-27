
import { useEffect, useRef } from "react";

function DesmosCalculator() {
  const calculatorElement = useRef(null);

  useEffect(() => {
    const calculator = window.Desmos.GraphingCalculator(
      calculatorElement.current
    );

    return () => calculator.destroy();
  }, []);

  return (
    <div
      ref={calculatorElement}
      className="desmos-calculator"
      style={{
        width: "100%",
        height: "1000px",
      }}
    />
  );
}

export default DesmosCalculator;
