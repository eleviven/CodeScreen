import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";

const Settings = observer(({ store }) => {
  let listener = null;
  let ref = useRef();
  useEffect(() => {
    listener = document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", listener);
    };
  });
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      store.setAppState("showMore", false);
    }
  };
  const { editorOptions, appState } = store;
  return (
    <div ref={ref} className="dropdown-content">
      <ul>
        <li
          className="button"
          onClick={() =>
            store.setEditorOptions("lineNumbers", !editorOptions.lineNumbers)
          }
        >
          <span>Line No</span>
          {editorOptions.lineNumbers && (
            <span className="text-success">
              <ion-icon name="checkmark-sharp"></ion-icon>
            </span>
          )}
        </li>
        <li>
          <span>Font</span>
          <label>
            <select
              value={editorOptions.font}
              onChange={(e) => store.setEditorOptions("font", e.target.value)}
            >
              <option value="monospace">monospace</option>
              <option value="monaco">monaco</option>
              <option value="Fira Code">Fira Code</option>
            </select>
          </label>
        </li>
        <li>
          <span>Export Size</span>
          <label>
            <select
              value={appState.exportSize}
              onChange={(e) => store.setAppState("exportSize", e.target.value)}
            >
              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
            </select>
          </label>
        </li>
      </ul>
    </div>
  );
});

export default Settings;
