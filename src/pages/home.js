import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Hero, Footer } from "../components";
import html2canvas from "html2canvas";

const Home = observer(function Home({ store }) {
  const { editorOptions, appState } = store;
  const editorWrapper = useRef();
  const [value, setValue] = useState(editorOptions.value);
  const backgroundColor = editorOptions.background;
  const mode = editorOptions.mode;
  const theme = editorOptions.theme;
  const lineNumbers = editorOptions.lineNumbers;
  const fontFamily = editorOptions.font;
  const exportSize = appState.exportSize;
  const [moreTools, setMoreTools] = useState(false);
  const loading = appState.loading;
  const options = {
    extraKeys: { "Ctrl-Space": "autocomplete" },
    mode: {
      name: mode,
      globalVars: true,
    },
    theme,
    lineNumbers,
  };
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
    <React.Fragment>
      <Hero
        title="‹CodeScreen›"
        paragraph="Create and share beautiful images of your source code. Start typing or
        drop a file into the text area to get started."
      />
      <section className="preview">
        <center>
          <div className="preview-inner">
            <div className="preview-toolbar">
              <ul>
                <li>
                  <label className="select-box">
                    <span>Mode</span>
                    <select
                      onChange={(e) =>
                        store.setEditorOptions("mode", e.target.value)
                      }
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="php">php</option>
                      <option value="css">css</option>
                      <option value="sass">sass</option>
                      <option value="python">python</option>
                      <option value="markdown">markdown</option>
                      <option value="dart">dart</option>
                    </select>
                  </label>
                </li>
                <li>
                  <label className="select-box">
                    <span>Theme</span>
                    <select
                      onChange={(e) =>
                        store.setEditorOptions("theme", e.target.value)
                      }
                    >
                      <option value="material">Material</option>
                      <option value="ayu-mirage">Ayu Mirage</option>
                      <option value="duotone-light">Duotone Light</option>
                      <option value="duotone-dark">Duotone Dark</option>
                    </select>
                  </label>
                </li>
              </ul>
              <ul>
                <li>
                  <button className="btn btn-primary btn-icon colorpicker">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) =>
                        store.setEditorOptions("background", e.target.value)
                      }
                    />
                  </button>
                </li>
                <li className="dropdown">
                  <button
                    className="btn btn-primary btn-icon"
                    onClick={() => setMoreTools(!moreTools)}
                  >
                    <ion-icon name="settings-sharp"></ion-icon>
                  </button>
                  {moreTools && (
                    <div className="dropdown-content">
                      <ul>
                        <li
                          className="button"
                          onClick={() =>
                            store.setEditorOptions("lineNumbers", !lineNumbers)
                          }
                        >
                          <span>Line No</span>
                          {lineNumbers && (
                            <span className="text-success">
                              <ion-icon name="checkmark-sharp"></ion-icon>
                            </span>
                          )}
                        </li>
                        <li>
                          <span>Font</span>
                          <label>
                            <select
                              onChange={(e) =>
                                store.setEditorOptions("font", e.target.value)
                              }
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
                              value={exportSize}
                              onChange={(e) =>
                                store.setAppState("exportSize", e.target.value)
                              }
                            >
                              <option value="1">1x</option>
                              <option value="2">2x</option>
                              <option value="3">3x</option>
                            </select>
                          </label>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="button">
                  <button
                    className="btn btn-secondary"
                    onClick={captureHandler}
                  >
                    Export
                  </button>
                </li>
              </ul>
            </div>
            <div className="preview-body">
              <div
                ref={editorWrapper}
                className="preview-browser-wrapper"
                style={{ backgroundColor }}
              >
                <div className="preview-browser">
                  <div className="preview-top">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <CodeMirror
                    value={value}
                    options={options}
                    onBeforeChange={(editor, data, value) => {
                      setValue(value);
                    }}
                  />
                </div>
                {loading && <div className="preview-overlay"></div>}
              </div>
            </div>
          </div>
        </center>
      </section>
      <Footer />
      <style>{`
        .CodeMirror {
          font-family: ${fontFamily};
        }
      `}</style>
    </React.Fragment>
  );
});

export default Home;
