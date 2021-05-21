import React from "react";
import { Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function Navbar({ title, editState, addState, searchHandler }) {
  return (
    <div className="Nav">
      <div className="Nav__title">
        <p>Jogja Guide Admin </p>
        <p>{title}</p>
      </div>

      <div className="Nav__functions">
        <div className="Nav__search">
          <Search className="Nav__search-icon" fontSize="small" />
          <input
            type="text"
            placeholder="search"
            onChange={(el) => searchHandler(el.target.value)}
          />
        </div>
        <Button className="Nav__button" onClick={() => editState()}>
          Edit
        </Button>
        <Button className="Nav__button" onClick={() => addState()}>
          Add new
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
