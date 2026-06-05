import { Renderer } from 'marked';
import hljs from 'highlight.js';
import { StyleMapper } from './style-mapper';
import type { TemplateStyle } from '../types/template';

/**
 * Custom marked renderer that produces inline-styled HTML.
 * All styling is done via inline style attributes to ensure
 * compatibility with WeChat public account editor.
 */
export class CustomRenderer extends Renderer {
  private styleMapper: StyleMapper;
  private templateStyle: TemplateStyle;

  constructor(templateStyle: TemplateStyle) {
    super();
    this.styleMapper = new StyleMapper();
    this.templateStyle = templateStyle;
  }

  /**
   * Update the template style (used when switching templates).
   */
  setTemplateStyle(style: TemplateStyle): void {
    this.templateStyle = style;
  }

  /**
   * Render a heading with inline styles.
   */
  override heading(text: string, level: number): string {
    const style = this.styleMapper.headingStyle(
      level === 1
        ? this.templateStyle.h1
        : level === 2
          ? this.templateStyle.h2
          : this.templateStyle.h3,
      level,
    );
    return `<h${level} style="${style}">${text}</h${level}>`;
  }

  /**
   * Render a paragraph with inline styles.
   */
  override paragraph(text: string): string {
    // Skip empty paragraphs
    if (!text.trim()) {
      return '';
    }
    const style = this.styleMapper.paragraphStyle(this.templateStyle.paragraph);
    return `<p style="${style}">${text}</p>`;
  }

  /**
   * Render a blockquote with inline styles.
   */
  override blockquote(quote: string): string {
    const style = this.styleMapper.blockquoteStyle(this.templateStyle.blockquote);
    return `<blockquote style="${style}">${quote}</blockquote>`;
  }

  /**
   * Render a code block with syntax highlighting and inline styles.
   */
  override code(code: string, lang: string): string {
    const style = this.styleMapper.codeBlockStyle(this.templateStyle.codeBlock);

    let highlighted: string;
    try {
      if (lang && hljs.getLanguage(lang)) {
        highlighted = hljs.highlight(code, { language: lang }).value;
      } else {
        highlighted = hljs.highlightAuto(code).value;
      }
    } catch {
      highlighted = code;
    }

    return `<pre style="${style}"><code>${highlighted}</code></pre>`;
  }

  /**
   * Render inline code with styling.
   */
  override codespan(text: string): string {
    const style = this.styleMapper.inlineCodeStyle(this.templateStyle.inlineCode);
    return `<code style="${style}">${text}</code>`;
  }

  /**
   * Render a list with inline styles.
   */
  override list(body: string, ordered: boolean): string {
    const style = this.styleMapper.listStyle(this.templateStyle.list);
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag} style="${style}">${body}</${tag}>`;
  }

  /**
   * Render a list item.
   */
  override listitem(text: string): string {
    return `<li style="margin-bottom:4px;">${text}</li>`;
  }

  /**
   * Render a horizontal rule with inline styles.
   */
  override hr(): string {
    const style = this.styleMapper.dividerStyle(this.templateStyle.divider);
    return `<hr style="${style}" />`;
  }

  /**
   * Render an image with inline styles.
   */
  override image(href: string, _title: string, text: string): string {
    const style = this.styleMapper.imageStyle(this.templateStyle.image);
    const alt = text || '';
    return `<img src="${href}" alt="${alt}" style="${style}" />`;
  }

  /**
   * Render a link with inline styles.
   */
  override link(href: string, _title: string, text: string): string {
    const style = this.styleMapper.linkStyle(this.templateStyle.link);
    return `<a href="${href}" style="${style}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  }

  /**
   * Render strong (bold) text.
   */
  override strong(text: string): string {
    return `<strong style="font-weight:bold;">${text}</strong>`;
  }

  /**
   * Render emphasized (italic) text.
   */
  override em(text: string): string {
    return `<em style="font-style:italic;">${text}</em>`;
  }

  /**
   * Render a table with inline styles.
   */
  override table(header: string, body: string): string {
    const tableStyle = 'width:100%;border-collapse:collapse;margin:16px 0;';
    return `<table style="${tableStyle}">${header}${body}</table>`;
  }

  /**
   * Render a table cell.
   */
  override tablecell(
    content: string,
    flags: { header: boolean; align: 'center' | 'left' | 'right' | null },
  ): string {
    const tag = flags.header ? 'th' : 'td';
    const align = flags.align ? `text-align:${flags.align};` : '';
    const borderStyle = 'border:1px solid #ddd;padding:8px;';
    const headerBg = flags.header ? 'background-color:#f5f5f5;font-weight:bold;' : '';
    return `<${tag} style="${borderStyle}${align}${headerBg}">${content}</${tag}>`;
  }
}
