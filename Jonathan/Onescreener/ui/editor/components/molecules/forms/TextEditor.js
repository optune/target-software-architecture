// React
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'

import { ComponentLoading } from '@optune/react-base-components'

// Styling
import styled from 'styled-components'

const getHeight = (height) => (height ? height - 140 : 700)

const TextEditorContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  max-height: ${({ editorHeight }) => editorHeight}px;
  min-height: 200px;
  margin-bottom: 3rem;

  & > div > div > .tox-statusbar {
    display: none;
  }
`
const EditorContainer = styled.div`
  position: relative;
  z-index: 2;
`

const Loading = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1;
`

export const TextEditor = ({ value, height, onChange, onBlur }) => (
  <TextEditorContainer editorHeight={getHeight(height)}>
    <Loading>
      <ComponentLoading label="Loading Editor" />
    </Loading>
    <EditorContainer>
      <Editor
        id="tinymce-editor"
        onEditorChange={onChange}
        onBlur={onBlur}
        value={value}
        tabindex="1"
        init={{
          height: getHeight(height),
          selector: '#tinymce-editor',
          menubar: false,
          plugins: ['link', 'lists', 'autolink'],
          remove_trailing_brs: false,
          toolbar: [
            'undo redo | fontselect formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignfull | outdent indent | link | removeformat',
          ],
          font_formats:
            'Cera=CeraPRO, sans-serif; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          // style_formats: [
          //   { title: 'Paragraph', format: 'p' },
          //   { title: 'Heading 1', format: 'h1' },
          //   { title: 'Heading 2', format: 'h2' },
          //   { title: 'Heading 3', format: 'h3' },
          //   { title: 'Heading 4', format: 'h4' },
          //   { title: 'Heading 5', format: 'h5' },
          //   { title: 'Heading 6', format: 'h6' },
          // ],
          mobile: {
            theme: 'mobile',
            toolbar: [
              'fontselect formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignfull',
            ],
          },
        }}
        apiKey={Meteor.settings.public.TINYMCE_API_KEY}
      />
    </EditorContainer>
  </TextEditorContainer>
)

TextEditor.propTypes = {
  height: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
