import React, { memo, useEffect, useState } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import Placeholders from './Placeholders';
import '~/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '~/src/assets/library/customEditor.css';

const CustomEditor = ({ initialText = '', onEditorStateChange, availablePlaceholders = true }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!initialText || (typeof initialText === 'object' && !initialText.content)) return;

    const text = initialText.content || initialText;

    const content = EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(text))
    );

    setEditorState(content);
  }, [initialText.content]);

  const handleEditorChange = changedEditorState => {
    setEditorState(changedEditorState);
    const convertedText = draftToHtml(convertToRaw(changedEditorState.getCurrentContent()));
    onEditorStateChange(convertedText);
  };

  const customizable = () => {
    if (typeof initialText === 'object' && Object.keys(initialText).includes('customizable')) {
      return !initialText.customizable;
    }
    return false;
  };

  return (
    <div
      data-testid="editor-wrapper"
      id="editor-wrapper"
      style={{ background: !customizable() ? 'none' : '#d9d9d9' }}
    >
      <Editor
        readOnly={customizable()}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['blockType', 'inline', 'link', 'list', 'history', 'emoji', 'image'],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic']
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'Blockquote', 'Code']
          },
          list: { inDropdown: false, options: ['unordered', 'ordered'] },
          emoji: {
            icon: 'https://github.githubassets.com/images/icons/emoji/unicode/1f604.png?v8',
            className: 'emoji-icon'
          },
          image: {
            icon: '../../../static/image.png',
            className: 'image-icon',
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: false,
            uploadCallback: undefined,
            alignmentEnabled: true,
            previewImage: false,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: 'auto',
              width: 'auto'
            }
          }
        }}
        toolbarCustomButtons={availablePlaceholders ? [<Placeholders />] : []}
        locale="es"
      />
    </div>
  );
};

export default memo(CustomEditor);
