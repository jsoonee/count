import { IconButton, TablerMenu2 } from "../../lib/Icons";
import Control from "./Control";
import Title from "./Title";
import "./header.scss";


export default ({title}: {title: string}) => {
  return (
    <header className="header">
      <div className="header-left">
        <IconButton
          className="icon-button-square button-alt"
          onClick={() => null}
        >
          <TablerMenu2 />
        </IconButton>
        <Title title={title} />
      </div>
      <Control />
    </header>
  );
};
