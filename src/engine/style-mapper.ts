import type { TemplateStyle, HeadingStyle, ParagraphStyle, BlockquoteStyle, CodeBlockStyle, InlineCodeStyle, ListStyle, DividerStyle, ImageStyle, LinkStyle, RootStyle } from '../types/template';

/**
 * Convert a style object to an inline CSS string.
 * Filters out empty/falsy values.
 * @param styleObj - Object with CSS property-value pairs
 * @returns Inline CSS string (e.g., "font-size:16px;color:#333;")
 */
function styleToString(styleObj: Record<string, string>): string {
  return Object.entries(styleObj)
    .filter(([, value]) => value && value !== 'none' && value !== 'none' && value.length > 0)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}:${value}`;
    })
    .join(';');
}

/**
 * StyleMapper maps TemplateStyle parameters to inline CSS strings.
 * Each method corresponds to a Markdown token type and returns
 * a CSS inline style string.
 */
export class StyleMapper {
  /**
   * Generate inline style for a heading.
   * @param style - The heading style configuration
   * @param level - Heading level (1-3)
   * @returns Inline CSS string
   */
  headingStyle(style: HeadingStyle, _level: number): string {
    return styleToString({
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      color: style.color,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      textAlign: style.textAlign,
      borderBottom: style.borderBottom,
      paddingBottom: style.borderBottom && style.borderBottom !== 'none' ? '8px' : '',
      lineHeight: '1.4',
    });
  }

  /**
   * Generate inline style for a paragraph.
   * @param style - The paragraph style configuration
   * @returns Inline CSS string
   */
  paragraphStyle(style: ParagraphStyle): string {
    return styleToString({
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      color: style.color,
      letterSpacing: style.letterSpacing,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      textAlign: style.textAlign,
    });
  }

  /**
   * Generate inline style for a blockquote.
   * @param style - The blockquote style configuration
   * @returns Inline CSS string
   */
  blockquoteStyle(style: BlockquoteStyle): string {
    return styleToString({
      borderLeft: style.borderLeft,
      paddingLeft: style.paddingLeft,
      color: style.color,
      backgroundColor: style.bgColor,
      fontSize: style.fontSize,
      marginTop: '0px',
      marginBottom: '16px',
      paddingTop: '12px',
      paddingBottom: '12px',
      borderRadius: '0 4px 4px 0',
    });
  }

  /**
   * Generate inline style for a code block.
   * @param style - The code block style configuration
   * @returns Inline CSS string
   */
  codeBlockStyle(style: CodeBlockStyle): string {
    return styleToString({
      backgroundColor: style.bgColor,
      color: style.color,
      fontSize: style.fontSize,
      borderRadius: style.borderRadius,
      padding: style.padding,
      marginTop: '0px',
      marginBottom: '16px',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      lineHeight: '1.6',
    });
  }

  /**
   * Generate inline style for inline code.
   * @param style - The inline code style configuration
   * @returns Inline CSS string
   */
  inlineCodeStyle(style: InlineCodeStyle): string {
    return styleToString({
      backgroundColor: style.bgColor,
      color: style.color,
      padding: style.padding,
      borderRadius: style.borderRadius,
      fontSize: style.fontSize,
      fontFamily: '"SF Mono", "Fira Code", Menlo, Consolas, monospace',
    });
  }

  /**
   * Generate inline style for a list.
   * @param style - The list style configuration
   * @returns Inline CSS string
   */
  listStyle(style: ListStyle): string {
    return styleToString({
      color: style.color,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      paddingLeft: style.paddingLeft,
      marginTop: '0px',
      marginBottom: '16px',
    });
  }

  /**
   * Generate inline style for a horizontal divider.
   * @param style - The divider style configuration
   * @returns Inline CSS string
   */
  dividerStyle(style: DividerStyle): string {
    return styleToString({
      border: style.border,
      margin: style.margin,
    });
  }

  /**
   * Generate inline style for an image.
   * @param style - The image style configuration
   * @returns Inline CSS string
   */
  imageStyle(style: ImageStyle): string {
    return styleToString({
      maxWidth: style.maxWidth,
      borderRadius: style.borderRadius,
      margin: style.margin,
      display: 'block',
    });
  }

  /**
   * Generate inline style for a link.
   * @param style - The link style configuration
   * @returns Inline CSS string
   */
  linkStyle(style: LinkStyle): string {
    return styleToString({
      color: style.color,
      textDecoration: style.textDecoration,
    });
  }

  /**
   * Generate inline style for the root container.
   * @param style - The root style configuration
   * @returns Inline CSS string
   */
  rootStyle(style: RootStyle): string {
    return styleToString({
      backgroundColor: style.bgColor,
      padding: style.padding,
      fontFamily: style.fontFamily,
    });
  }

  /**
   * Map a TemplateStyle to an inline style string for a given token type.
   * @param style - The complete template style
   * @param token - The token type name
   * @returns Inline CSS string
   */
  mapToInline(style: TemplateStyle, token: string, level?: number): string {
    switch (token) {
      case 'heading':
        if (level === 1) return this.headingStyle(style.h1, 1);
        if (level === 2) return this.headingStyle(style.h2, 2);
        return this.headingStyle(style.h3, 3);
      case 'paragraph':
        return this.paragraphStyle(style.paragraph);
      case 'blockquote':
        return this.blockquoteStyle(style.blockquote);
      case 'code':
        return this.codeBlockStyle(style.codeBlock);
      case 'codespan':
        return this.inlineCodeStyle(style.inlineCode);
      case 'list':
        return this.listStyle(style.list);
      case 'hr':
        return this.dividerStyle(style.divider);
      case 'image':
        return this.imageStyle(style.image);
      case 'link':
        return this.linkStyle(style.link);
      default:
        return '';
    }
  }
}
