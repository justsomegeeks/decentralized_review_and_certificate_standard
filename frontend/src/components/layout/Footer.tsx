import React, { ReactElement } from "react";
import { joinClasses } from "../../helpers";

export default function Footer(): ReactElement {
  return (
    <div className={joinClasses("py-4", "border-t-2", "text-center")}>
      Created by{" "}
      <a
        className="text-blue-700 hover:underline"
        href="https://github.com/justsomegeeks"
        target="_blank"
        rel="noreferrer"
      >
        Just Some Geeks
      </a>
    </div>
  );
}
