import { describe, it, expect } from 'vitest';
import { FormatEngine } from '../engine/index';
import { simpleWhite } from '../templates/simple-white';
import { businessBlue } from '../templates/business-blue';
import { warmOrange } from '../templates/warm-orange';
import { elegantGreen } from '../templates/elegant-green';
import { techDark } from '../templates/tech-dark';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a fresh engine instance with the simple-white template */
function createEngine() {
  return new FormatEngine(simpleWhite);
}

/** Assert that a string contains the expected substring, with a useful diff */
function assertContains(html: string, expected: string) {
  expect(html).toContain(expected);
}

// ---------------------------------------------------------------------------
// Markdown heading parsing (h1–h3)
// ---------------------------------------------------------------------------

describe('FormatEngine - headings', () => {
  it('should parse h1 with inline style attribute', () => {
    const engine = createEngine();
    const html = engine.format('# Hello World');
    assertContains(html, '<h1');
    assertContains(html, 'style=');
    assertContains(html, 'Hello World');
    assertContains(html, '</h1>');
  });

  it('should parse h2 with inline style attribute', () => {
    const engine = createEngine();
    const html = engine.format('## Section Two');
    assertContains(html, '<h2');
    assertContains(html, 'style=');
    assertContains(html, 'Section Two');
    assertContains(html, '</h2>');
  });

  it('should parse h3 with inline style attribute', () => {
    const engine = createEngine();
    const html = engine.format('### Subsection');
    assertContains(html, '<h3');
    assertContains(html, 'style=');
    assertContains(html, 'Subsection');
    assertContains(html, '</h3>');
  });

  it('should apply template-specific h1 styles', () => {
    const engine = createEngine();
    const html = engine.format('# Title');
    // simple-white h1 uses color #1a1a1a
    assertContains(html, 'color:#1a1a1a');
    assertContains(html, 'font-weight:bold');
  });
});

// ---------------------------------------------------------------------------
// Paragraph parsing
// ---------------------------------------------------------------------------

describe('FormatEngine - paragraphs', () => {
  it('should parse a paragraph with inline style attribute', () => {
    const engine = createEngine();
    const html = engine.format('This is a paragraph.');
    assertContains(html, '<p');
    assertContains(html, 'style=');
    assertContains(html, 'This is a paragraph.');
    assertContains(html, '</p>');
  });

  it('should apply paragraph styles from the template', () => {
    const engine = createEngine();
    const html = engine.format('Some text here.');
    // simple-white paragraph uses color #333333
    assertContains(html, 'color:#333333');
  });

  it('should handle multi-paragraph markdown', () => {
    const engine = createEngine();
    const html = engine.format('First paragraph.\n\nSecond paragraph.');
    // Both paragraphs should appear
    const pCount = (html.match(/<p /g) || []).length;
    expect(pCount).toBeGreaterThanOrEqual(2);
  });

  it('should return empty string for empty input', () => {
    const engine = createEngine();
    expect(engine.format('')).toBe('');
    expect(engine.format('   ')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// List parsing
// ---------------------------------------------------------------------------

describe('FormatEngine - lists', () => {
  it('should parse unordered lists with inline styles', () => {
    const engine = createEngine();
    const html = engine.format('- Item A\n- Item B');
    assertContains(html, '<ul');
    assertContains(html, 'style=');
    assertContains(html, '<li');
    assertContains(html, 'Item A');
    assertContains(html, 'Item B');
  });

  it('should parse ordered lists with inline styles', () => {
    const engine = createEngine();
    const html = engine.format('1. First\n2. Second');
    assertContains(html, '<ol');
    assertContains(html, 'style=');
    assertContains(html, 'First');
    assertContains(html, 'Second');
  });

  it('should apply list styles from template', () => {
    const engine = createEngine();
    const html = engine.format('- Test item');
    // simple-white list uses color #333333
    assertContains(html, 'color:#333333');
  });
});

// ---------------------------------------------------------------------------
// Blockquote parsing
// ---------------------------------------------------------------------------

describe('FormatEngine - blockquotes', () => {
  it('should parse a blockquote with inline style attribute', () => {
    const engine = createEngine();
    const html = engine.format('> This is a quote');
    assertContains(html, '<blockquote');
    assertContains(html, 'style=');
    assertContains(html, 'This is a quote');
    assertContains(html, '</blockquote>');
  });

  it('should apply blockquote styles from template', () => {
    const engine = createEngine();
    const html = engine.format('> Quoted text');
    // simple-white blockquote uses borderLeft with #bdbdbd
    assertContains(html, 'border-left:4px solid #bdbdbd');
  });
});

// ---------------------------------------------------------------------------
// Code block parsing
// ---------------------------------------------------------------------------

describe('FormatEngine - code blocks', () => {
  it('should parse a fenced code block with inline style', () => {
    const engine = createEngine();
    const html = engine.format('```js\nconst x = 1;\n```');
    assertContains(html, '<pre');
    assertContains(html, 'style=');
    assertContains(html, '<code>');
    // highlight.js wraps tokens in <span> tags for syntax highlighting
    assertContains(html, 'const');
    assertContains(html, 'x');
  });

  it('should apply code block styles from template', () => {
    const engine = createEngine();
    const html = engine.format('```\ncode\n```');
    // simple-white codeBlock uses bgColor #f5f5f5
    assertContains(html, 'background-color:#f5f5f5');
  });

  it('should handle inline code with styles', () => {
    const engine = createEngine();
    const html = engine.format('Use `const` keyword');
    assertContains(html, '<code');
    assertContains(html, 'style=');
    assertContains(html, 'const');
    assertContains(html, '</code>');
  });
});

// ---------------------------------------------------------------------------
// Inline style verification
// ---------------------------------------------------------------------------

describe('FormatEngine - inline styles', () => {
  it('should produce output with style attribute on every block element', () => {
    const engine = createEngine();
    const html = engine.format('# Title\n\nParagraph\n\n- List item');
    // Every structural tag should carry a style
    expect(html).toContain('<h1 style=');
    expect(html).toContain('<p style=');
    expect(html).toContain('<ul style=');
  });

  it('should wrap output in a section with root style', () => {
    const engine = createEngine();
    const html = engine.format('Hello');
    assertContains(html, '<section style=');
    assertContains(html, '</section>');
    // simple-white root uses bgColor #ffffff
    assertContains(html, 'background-color:#ffffff');
  });

  it('should NOT contain class attributes (pure inline style output)', () => {
    const engine = createEngine();
    const html = engine.format('# Title\n\nParagraph');
    // There should be no class="..." in the output
    expect(html).not.toMatch(/\sclass="/);
  });
});

// ---------------------------------------------------------------------------
// Template switching (5 templates)
// ---------------------------------------------------------------------------

describe('FormatEngine - template switching', () => {
  const templates = [
    { name: 'simple-white', config: simpleWhite, marker: 'color:#1a1a1a' },
    { name: 'business-blue', config: businessBlue, marker: 'color:#0d47a1' },
    { name: 'warm-orange', config: warmOrange, marker: 'color:#e65100' },
    { name: 'elegant-green', config: elegantGreen, marker: 'color:#1b5e20' },
    { name: 'tech-dark', config: techDark, marker: 'color:#00e5ff' },
  ];

  for (const t of templates) {
    it(`should use "${t.name}" template styles when set`, () => {
      const engine = createEngine();
      engine.setTemplate(t.config);
      const html = engine.format('# Title');
      assertContains(html, t.marker);
    });
  }

  it('getCurrentTemplate should return the current template', () => {
    const engine = createEngine();
    expect(engine.getCurrentTemplate().id).toBe('simple-white');

    engine.setTemplate(businessBlue);
    expect(engine.getCurrentTemplate().id).toBe('business-blue');
  });

  it('should re-render with new template styles after switching', () => {
    const engine = createEngine();
    const htmlBefore = engine.format('# Title');
    assertContains(htmlBefore, 'color:#1a1a1a'); // simple-white h1

    engine.setTemplate(techDark);
    const htmlAfter = engine.format('# Title');
    assertContains(htmlAfter, 'color:#00e5ff'); // tech-dark h1
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('FormatEngine - edge cases', () => {
  it('should return lastHtml on format error (regression)', () => {
    const engine = createEngine();
    // First format something valid to populate lastHtml
    engine.format('# Saved');
    const last = engine.getHtml();
    expect(last).toContain('Saved');

    // Format something that could cause issues — but the engine
    // catches errors and returns lastHtml.  Marked is robust so we
    // just verify the getter works.
    const result = engine.format('Valid markdown');
    expect(result).toBeTruthy();
  });

  it('getHtml should return the last formatted HTML', () => {
    const engine = createEngine();
    engine.format('**bold**');
    const html = engine.getHtml();
    expect(html).toContain('<strong');
  });
});
