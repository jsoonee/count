import "./main.scss";
import React from "react";

export default ({children}: {children: React.ReactNode}) => {
  return (
    <main className="main">
      {children}
    </main>
  );
};
