import type { TemplateConfig } from '../types/template';

/** 科技黑模板 - 暗色主题，亮色代码块，适合技术/编程文章 */
export const techDark: TemplateConfig = {
  id: 'tech-dark',
  name: '科技黑',
  description: '暗色主题，亮色代码块，适合技术/编程文章',
  style: {
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#00e5ff',
      marginTop: '28px',
      marginBottom: '16px',
      textAlign: 'left',
      borderBottom: '2px solid #00bcd4',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#18ffff',
      marginTop: '22px',
      marginBottom: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #37474f',
    },
    h3: {
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#80deea',
      marginTop: '18px',
      marginBottom: '10px',
      textAlign: 'left',
      borderBottom: 'none',
    },
    paragraph: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: '#eceff1',
      letterSpacing: '0.5px',
      marginTop: '0px',
      marginBottom: '16px',
      textAlign: 'justify',
    },
    blockquote: {
      borderLeft: '4px solid #00bcd4',
      paddingLeft: '16px',
      color: '#b0bec5',
      bgColor: '#263238',
      fontSize: '14px',
    },
    codeBlock: {
      bgColor: '#0d1117',
      color: '#e6edf3',
      fontSize: '13px',
      borderRadius: '6px',
      padding: '16px',
    },
    inlineCode: {
      bgColor: '#1e3a5f',
      color: '#7ec8e3',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '90%',
    },
    list: {
      color: '#eceff1',
      fontSize: '15px',
      lineHeight: '1.8',
      paddingLeft: '24px',
    },
    divider: {
      border: '1px solid #37474f',
      margin: '24px 0',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '4px',
      margin: '16px 0',
    },
    link: {
      color: '#4dd0e1',
      textDecoration: 'underline',
    },
    root: {
      bgColor: '#1a1a2e',
      padding: '20px 16px',
      fontFamily: '"SF Mono", "Fira Code", Menlo, Consolas, monospace',
    },
  },
};
