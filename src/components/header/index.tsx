import { IconButton, TablerMenu2 } from "../lib/Icons";
import Control from "./Control";
import Title from "./Title";
import "./header.scss";

export default () => {
  return (
    <header className="header">
      <div className="header-left">
        <IconButton className="icon-button-square" onClick={() => null}><TablerMenu2 /></IconButton>
      <Title />
      </div>
      <Control />
    </header>
  );
};
