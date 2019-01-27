import * as React from 'react';
import { PureComponent } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { DEFAULT_CODE_VALUE, DEFAULT_ACTIVE_TAB_KEY } from 'src/constants';

interface Props {
  activeKey: string;
  defaultCode: string;
  isCodeChanged: boolean;
  onChangeCode: (newCode: string, value: boolean) => void; 
}

interface State {
  code: string;
}

export default class TextEditor extends PureComponent<Props, State> {
  state: State = {
    code: this.props.defaultCode
  }

  editorDidMount(editor: any) {
    editor.focus();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.defaultCode !== this.props.defaultCode) {
      this.setState({ code: nextProps.defaultCode });
    }
  }

  onChange = (newValue, e) => {
    const { activeKey, defaultCode } = this.props;
    if (activeKey === DEFAULT_ACTIVE_TAB_KEY) {
      const isDirty: boolean = newValue !== defaultCode;
      this.props.onChangeCode(newValue, isDirty); 
    }
  }
  render() {
    const { code } = this.state;
    const options = {
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
    return (
      <MonacoEditor
        width="100%"
        height="520"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
        defaultValue={DEFAULT_CODE_VALUE}
      />
    )
  }
}