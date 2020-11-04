import React, { useState } from "react";
import { observer } from "mobx-react";
import html2canvas from "html2canvas";
import { Button, Select, Dropdown } from "../";

const PreviewToolbar = observer(function PreviewToolbar({
  store,
  editorWrapper,
}) {
  const { editorOptions, appState } = store;
  const exportSize = appState.exportSize;
  const background = editorOptions.background;
  const showMore = appState.showMore;

  const captureHandler = () => {
    editorWrapper.current.style.transform = `scale(${exportSize})`;
    store.setAppState("loading", true);
    html2canvas(editorWrapper.current, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      editorWrapper.current.style.transform = `scale(1)`;
      store.setAppState("loading", false);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.setAttribute("download", "code-screen.png");
      link.href = image;
      document.body.append(link);
      link.click();
      link.remove();
    });
  };

  return (
    <div className="preview-toolbar">
      <ul>
        <li>
          <Select.Wrapper
            title="Mode"
            onChange={(e) => store.setEditorOptions("mode", e.target.value)}
          >
            <Select.Item value="javascript" title="JavaScript" />
            <Select.Item value="php" title="php" />
            <Select.Item value="css" title="css" />
            <Select.Item value="sass" title="sass" />
            <Select.Item value="python" title="python" />
            <Select.Item value="markdown" title="markdown" />
            <Select.Item value="dart" title="dart" />
          </Select.Wrapper>
        </li>
        <li>
          <Select.Wrapper
            title="Theme"
            onChange={(e) => store.setEditorOptions("theme", e.target.value)}
          >
            <Select.Item value="material" title="Material" />
            <Select.Item value="ayu-mirage" title="Ayu Mirage" />
            <Select.Item value="duotone-light" title="Duotone Light" />
            <Select.Item value="duotone-dark" title="Duotone Dark" />
          </Select.Wrapper>
        </li>
      </ul>
      <ul>
        <li>
          <Button className="colorpicker" square={true}>
            <input
              type="color"
              value={background}
              onChange={(e) =>
                store.setEditorOptions("background", e.target.value)
              }
            />
          </Button>
        </li>
        <li className="dropdown">
          <Button
            square={true}
            onClick={() => store.setAppState("showMore", !showMore)}
          >
            <ion-icon name="settings-sharp"></ion-icon>
          </Button>
          {showMore && <Dropdown.Settings store={store} />}
        </li>
        <li>
          <Button title="Export" variant="secondary" onClick={captureHandler} />
        </li>
      </ul>
    </div>
  );
});

export default PreviewToolbar;
