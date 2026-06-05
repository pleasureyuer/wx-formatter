import React, { useCallback, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import EditorToolbar from './EditorToolbar';
import { useAppContext } from '../store/AppContext';
import { AppActionType } from '../store/actions';
import { FormatEngine } from '../engine';
import { getTemplate } from '../templates';

/**
 * Editor - Markdown editor with toolbar and 300ms debounce.
 */
const Editor: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const engineRef = useRef<FormatEngine | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize format engine
  useEffect(() => {
    const template = getTemplate(state.selectedTemplateId);
    if (template) {
      if (!engineRef.current) {
        engineRef.current = new FormatEngine(template);
      } else {
        engineRef.current.setTemplate(template);
      }
    }
  }, [state.selectedTemplateId]);

  // Re-format when markdown changes (debounced)
  const formatMarkdown = useCallback(
    (markdown: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        if (engineRef.current) {
          const html = engineRef.current.format(markdown);
          dispatch({ type: AppActionType.SET_FORMATTED_HTML, payload: html });
        }
      }, 300);
    },
    [dispatch],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      dispatch({ type: AppActionType.SET_MARKDOWN, payload: value });
      formatMarkdown(value);
    },
    [dispatch, formatMarkdown],
  );

  // Handle toolbar insertions
  const handleInsert = useCallback(
    (before: string, after: string = '') => {
      const textarea = document.querySelector('.editor-textarea') as HTMLTextAreaElement | null;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = state.markdown.substring(start, end);
      const newText =
        state.markdown.substring(0, start) +
        before +
        selectedText +
        after +
        state.markdown.substring(end);

      dispatch({ type: AppActionType.SET_MARKDOWN, payload: newText });
      formatMarkdown(newText);

      // Restore cursor position
      requestAnimationFrame(() => {
        textarea.focus();
        const newCursorPos = start + before.length + selectedText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      });
    },
    [state.markdown, dispatch, formatMarkdown],
  );

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Initial format when component mounts
  useEffect(() => {
    if (state.markdown && engineRef.current) {
      const html = engineRef.current.format(state.markdown);
      dispatch({ type: AppActionType.SET_FORMATTED_HTML, payload: html });
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <EditorToolbar onInsert={handleInsert} />
      <textarea
        className="editor-textarea"
        value={state.markdown}
        onChange={handleChange}
        placeholder="在这里输入 Markdown 内容..."
        spellCheck={false}
      />
    </Box>
  );
};

export default Editor;
