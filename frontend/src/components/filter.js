import React from "react";
import ModalContext from "../context/ModalContext";

const Filter = () => {
  const { toggleActive, setContent } = React.useContext(ModalContext);

  return (
    <div className="ca-filter">
      <div className="e-con">
        <button
          className="ca-filter-button"
          onClick={() => {
            setContent(["filter", {}]);
            toggleActive();
          }}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
