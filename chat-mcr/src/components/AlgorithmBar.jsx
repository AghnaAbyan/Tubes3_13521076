import React from "react";

function AlgorithmBar() {
  return (
    <div class="btn-group">
      <button
        class="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          // code to handle the click event
          console.log("Button clicked");
        }}
      >
        Choose Algorithm
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">
          KMS
        </a>
        <a class="dropdown-item" href="#">
          BM
        </a>
      </div>
    </div>
  );
}

export default AlgorithmBar;
