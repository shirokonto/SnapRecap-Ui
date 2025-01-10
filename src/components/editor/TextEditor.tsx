import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface TextEditorProps {
  initialHtml: string;
  onContentChange: (content: string) => void;
}
/*
const TextEditor: React.FC<TextEditorProps> = ({
  initialHtml,
  onContentChange,
}) => {
  const contentBlock = htmlToDraft(initialHtml);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    );
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
    };
  }
  const contentState = contentBlock
    ? EditorState.createWithContent(contentBlock)
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(contentState);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
    onContentChange(htmlContent); // Pass updated content back to parent
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        width: '100%',
      }}
    >
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;*/
