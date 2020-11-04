import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Hero, Footer, Preview } from "../components";

const Home = observer(function Home({ store }) {
  const { editorOptions, appState } = store;
  const editorWrapper = useRef();
  const [value, setValue] = useState(editorOptions.value);
  const mode = editorOptions.mode;
  const theme = editorOptions.theme;
  const lineNumbers = editorOptions.lineNumbers;
  const fontFamily = editorOptions.font;
  const background = editorOptions.background;
  const options = {
    extraKeys: { "Ctrl-Space": "autocomplete" },
    mode: {
      name: mode,
      globalVars: true,
    },
    theme,
    lineNumbers,
  };
  return (
    <React.Fragment>
      <Hero
        title="‹CodeScreen›"
        paragraph="Create and share beautiful images of your source code. Start typing or
        drop a file into the text area to get started."
      />
      <Preview.Wrapper>
        <Preview.Toolbar store={store} editorWrapper={editorWrapper} />
        <div className="preview-body">
          <div
            ref={editorWrapper}
            className="preview-browser-wrapper"
            style={{ background }}
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
            {appState.loading && <div className="preview-overlay"></div>}
          </div>
        </div>
      </Preview.Wrapper>
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
