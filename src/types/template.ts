/** Heading style configuration (h1-h3) */
export interface HeadingStyle {
  fontSize: string;
  fontWeight: string;
  color: string;
  marginTop: string;
  marginBottom: string;
  textAlign: string;
  borderBottom: string;
}

/** Paragraph style configuration */
export interface ParagraphStyle {
  fontSize: string;
  lineHeight: string;
  color: string;
  letterSpacing: string;
  marginTop: string;
  marginBottom: string;
  textAlign: string;
}

/** Blockquote style configuration */
export interface BlockquoteStyle {
  borderLeft: string;
  paddingLeft: string;
  color: string;
  bgColor: string;
  fontSize: string;
}

/** Code block style configuration */
export interface CodeBlockStyle {
  bgColor: string;
  color: string;
  fontSize: string;
  borderRadius: string;
  padding: string;
}

/** Inline code style configuration */
export interface InlineCodeStyle {
  bgColor: string;
  color: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
}

/** List style configuration */
export interface ListStyle {
  color: string;
  fontSize: string;
  lineHeight: string;
  paddingLeft: string;
}

/** Horizontal divider style configuration */
export interface DividerStyle {
  border: string;
  margin: string;
}

/** Image style configuration */
export interface ImageStyle {
  maxWidth: string;
  borderRadius: string;
  margin: string;
}

/** Link style configuration */
export interface LinkStyle {
  color: string;
  textDecoration: string;
}

/** Root container style configuration */
export interface RootStyle {
  bgColor: string;
  padding: string;
  fontFamily: string;
}

/** Complete template style definition */
export interface TemplateStyle {
  h1: HeadingStyle;
  h2: HeadingStyle;
  h3: HeadingStyle;
  paragraph: ParagraphStyle;
  blockquote: BlockquoteStyle;
  codeBlock: CodeBlockStyle;
  inlineCode: InlineCodeStyle;
  list: ListStyle;
  divider: DividerStyle;
  image: ImageStyle;
  link: LinkStyle;
  root: RootStyle;
}

/** Template configuration with metadata and styles */
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  style: TemplateStyle;
}
