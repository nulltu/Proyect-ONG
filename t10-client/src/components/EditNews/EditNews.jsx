/* eslint-disable react/prop-types */
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditNews = ({ setValue, content }) => (
  <div className="App">
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        setValue('editor', data);
      }}
    />
  </div>
);

export default EditNews;
