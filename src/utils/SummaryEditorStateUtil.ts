import {
  EditorState,
  ContentState,
  convertFromRaw,
  RawDraftContentState,
} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const convertHtmlToEditorState = (html: string): EditorState => {
  const contentBlock = htmlToDraft(html);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
      contentBlock.entityMap,
    );
    return EditorState.createWithContent(contentState);
  }
  return EditorState.createEmpty();
};

export const convertSummaryToEditorState = (summary: string): EditorState => {
  const regex = /Section:\s*(.*?)\s*Summary:\s*([\s\S]*?)(?=Section:|$)/gi;
  const blocks = [];
  let match;
  while ((match = regex.exec(summary)) !== null) {
    blocks.push({
      key: Math.random().toString(36).substring(2, 10),
      text: match[1].trim(),
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    });
    blocks.push({
      key: Math.random().toString(36).substring(2, 10),
      text: match[2].trim(),
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    });
  }
  if (blocks.length === 0) {
    blocks.push({
      key: Math.random().toString(36).substring(2, 10),
      text: summary,
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    });
  }
  const rawContent: RawDraftContentState = {
    entityMap: {},
    blocks,
  };
  return EditorState.createWithContent(convertFromRaw(rawContent));
};

export const getInitialSummaryEditorState = (summary: string): EditorState => {
  if (!summary) {
    return EditorState.createEmpty();
  }
  return summary.includes('<h1>')
    ? convertHtmlToEditorState(summary)
    : convertSummaryToEditorState(summary);
};
