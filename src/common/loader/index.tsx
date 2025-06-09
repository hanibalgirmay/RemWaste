import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

const Loader = () => {
  const { promiseInProgress } = usePromiseTracker({ delay: 500 });

  return (
    promiseInProgress && (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <Hourglass size="80" bgOpacity="0.1" speed="1.75" color="black" />
      </div>
    )
  );
};

export default Loader;
