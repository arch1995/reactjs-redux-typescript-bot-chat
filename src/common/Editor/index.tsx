import * as React from 'react';
import { PureComponent } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { DEFAULT_CODE_VALUE } from 'src/constants';

interface Props {
  activeKey: string;
  code: string;
  isCodeChanged: boolean;
  onChangeCode: (newCode: string) => void; 
}

interface State {

}

const EDITOR_OPTIONS = {
  selectOnLineNumbers: true,
  autoIndent: true,
  smoothScrolling: true,
  scrollbar: {
    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 5
  },
  overviewRulerLanes: 25,
  occurrencesHighlight: false,
  minimap: { enabled: false }
};

export default class TextEditor extends PureComponent<Props, State> {

  editorDidMount(editor: any) {
    editor.focus();
  }

  onChange = (newValue, e) => {
    this.props.onChangeCode(newValue); 
  }
  render() {
    return (
      <MonacoEditor
        width="100%"
        height="520"
        language="javascript"
        theme="vs-dark"
        value={this.props.code}
        options={EDITOR_OPTIONS}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
        defaultValue={DEFAULT_CODE_VALUE}
      />
    )
  }
}