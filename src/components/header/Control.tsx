import React, { useState } from "react";
import {
  IconButton,
  TablerDownload,
  TablerPalette,
  TablerSettings,
  TablerUpload,
} from "../../lib/Icons";

export default () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="buttons">
      {open && (
        <div className="config-buttons">
          <IconButton className="icon-button-circle" onClick={() => null}>
            <TablerUpload />
          </IconButton>
          <IconButton className="icon-button-circle" onClick={() => null}>
            <TablerDownload />
          </IconButton>
          <IconButton className="icon-button-circle" onClick={() => null}>
            <TablerPalette />
          </IconButton>
        </div>
      )}
      <IconButton
        className={`icon-button-circle ${
          open ? "icon-button-circle-on" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <TablerSettings />
      </IconButton>
    </div>
  );
};
