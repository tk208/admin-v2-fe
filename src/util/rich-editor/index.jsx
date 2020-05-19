import React, { Component } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

// 依赖Jquery的富文本编辑器
export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.setEditor = (editor) => {
          this.editor = editor;
        };
        this.focusEditor = () => {
          if (this.editor) {
            this.editor.focus();
          }
          this.props.onValueChange(this.state.editorState.getCurrentContent().getPlainText());
        };
      }
 
      componentDidMount() {
        this.focusEditor();
      }

      componentWillReceiveProps(nextProps){
        let detailChange = this.props.detail !== nextProps.detail;
        if(!detailChange){
          return;
        }  
        this.editor.setState(nextProps.detail)
      }
    
      render() {
        const styles = {
            editor: {
              border: '1px solid gray',
              minHeight: '10em'
            }
        };
        return (
          <div style={styles.editor} onClick={this.focusEditor}>
            <Editor
              ref={this.setEditor}
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        );
      }
}
