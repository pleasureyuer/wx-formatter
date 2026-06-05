/**
 * Copy HTML content to clipboard using the Clipboard API.
 * Falls back to copying as plain text if HTML copy is not supported.
 * @param html - The HTML string to copy
 * @returns true if copy succeeded, false otherwise
 */
export async function copyHtml(html: string): Promise<boolean> {
  try {
    // Try to copy as HTML first (preserves formatting when pasting)
    if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const textBlob = new Blob([html], { type: 'text/plain' });
      const clipboardItem = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob,
      });
      await navigator.clipboard.write([clipboardItem]);
      return true;
    }

    // Fallback: use execCommand to copy HTML
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const success = document.execCommand('copy');
    document.body.removeChild(container);

    if (selection) {
      selection.removeAllRanges();
    }

    return success;
  } catch (error) {
    console.error('Failed to copy HTML:', error);
    return false;
  }
}

/**
 * Copy plain text to clipboard.
 * @param text - The text to copy
 * @returns true if copy succeeded, false otherwise
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback: use textarea + execCommand
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    return success;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}
