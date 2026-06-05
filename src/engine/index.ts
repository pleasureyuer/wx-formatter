import { marked } from 'marked';
import type { TemplateConfig } from '../types/template';
import { CustomRenderer } from './renderer';
import { StyleMapper } from './style-mapper';
import { sanitize } from './sanitizer';

/**
 * FormatEngine - Core formatting engine.
 * Converts Markdown to inline-styled HTML using template configurations.
 */
export class FormatEngine {
  private currentTemplate: TemplateConfig;
  private renderer: CustomRenderer;
  private styleMapper: StyleMapper;
  private lastHtml: string;

  constructor(template: TemplateConfig) {
    this.currentTemplate = template;
    this.styleMapper = new StyleMapper();
    this.renderer = new CustomRenderer(template.style);
    this.lastHtml = '';
  }

  /**
   * Set the current template and update the renderer.
   * @param template - The template configuration to use
   */
  setTemplate(template: TemplateConfig): void {
    this.currentTemplate = template;
    this.renderer.setTemplateStyle(template.style);
  }

  /**
   * Format Markdown text to inline-styled HTML.
   * @param markdown - The Markdown text to format
   * @returns Formatted HTML string with inline styles
   */
  format(markdown: string): string {
    if (!markdown.trim()) {
      this.lastHtml = '';
      return '';
    }

    // Configure marked with our custom renderer
    marked.setOptions({
      renderer: this.renderer,
      gfm: true,
      breaks: true,
    });

    try {
      const rawHtml = marked.parse(markdown) as string;

      // Wrap in root container with template root style
      const rootStyle = this.styleMapper.rootStyle(this.currentTemplate.style.root);
      const wrappedHtml = `<section style="${rootStyle}">${rawHtml}</section>`;

      // Sanitize the output
      this.lastHtml = sanitize(wrappedHtml);
      return this.lastHtml;
    } catch (error) {
      console.error('Format error:', error);
      return this.lastHtml;
    }
  }

  /**
   * Get the last formatted HTML.
   * @returns The last formatted HTML string
   */
  getHtml(): string {
    return this.lastHtml;
  }

  /**
   * Get the current template.
   * @returns The current TemplateConfig
   */
  getCurrentTemplate(): TemplateConfig {
    return this.currentTemplate;
  }
}
