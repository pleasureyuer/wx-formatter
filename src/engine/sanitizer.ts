import DOMPurify from 'dompurify';

/** Allowed HTML tags for WeChat article output */
const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'blockquote',
  'pre', 'code',
  'ul', 'ol', 'li',
  'strong', 'em', 'del', 's',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'div',
  'section',
];

/** Allowed HTML attributes */
const ALLOWED_ATTR = [
  'style',
  'href',
  'src',
  'alt',
  'target',
  'rel',
  'colspan',
  'rowspan',
];

/**
 * Sanitize HTML output for WeChat public account compatibility.
 * Removes dangerous tags (script, iframe, etc.) while preserving
 * inline styles and safe content.
 * @param html - The HTML string to sanitize
 * @returns Clean HTML string safe for WeChat editor
 */
export function sanitize(html: string): string {
  const purifyConfig = {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    FORCE_BODY: false,
  };

  return DOMPurify.sanitize(html, purifyConfig);
}
