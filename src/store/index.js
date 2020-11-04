import { observable, makeObservable, computed, action } from "mobx";

class Store {
  editorOptions = {
    mode: "javascript",
    theme: "material",
    background: "#7878ff",
    font: "monospace",
    lineNumbers: true,
    value: `function HelloWorld(){
      console.log("Hello World 🎉");
    }`,
  };

  appState = {
    exportSize: 1,
    loading: false,
  };

  setEditorOptions(key, val) {
    this.editorOptions[key] = val;
  }

  setAppState(key, val) {
    this.appState[key] = val;
  }

  constructor() {
    makeObservable(this, {
      editorOptions: observable,
      appState: observable,
      setEditorOptions: action,
    });
  }
}

export default new Store();
