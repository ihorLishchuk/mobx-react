import React from "react";
import { useViewMode } from "../../hooks";
import { VIEW_MODE } from "../../shared";

export const ViewModeSwitcher = () => {
  const viewMode = useViewMode();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={() => viewMode.mode = VIEW_MODE.PUBLIC}
        style={{
          backgroundColor: viewMode.isPublic ? "lightblue" : "white",
        }}
      >
        Public
      </button>
      <button
        onClick={() => viewMode.mode = VIEW_MODE.PRIVATE}
        style={{
          backgroundColor: viewMode.isPrivate ? "lightblue" : "white",
        }}
      >
        Private
      </button>
    </div>
  );
};