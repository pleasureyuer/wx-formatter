import type { TemplateConfig } from '../types/template';

/** 暖橙模板 - 温暖活泼，橙色为主色，适合生活/美食/旅行 */
export const warmOrange: TemplateConfig = {
  id: 'warm-orange',
  name: '暖橙',
  description: '温暖活泼，橙色为主色，适合生活/美食/旅行',
  style: {
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#e65100',
      marginTop: '28px',
      marginBottom: '16px',
      textAlign: 'left',
      borderBottom: '3px solid #ff9800',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#ef6c00',
      marginTop: '22px',
      marginBottom: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #ffcc80',
    },
    h3: {
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#f57c00',
      marginTop: '18px',
      marginBottom: '10px',
      textAlign: 'left',
      borderBottom: 'none',
    },
    paragraph: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: '#4e342e',
      letterSpacing: '0.5px',
      marginTop: '0px',
      marginBottom: '16px',
      textAlign: 'justify',
    },
    blockquote: {
      borderLeft: '4px solid #ff9800',
      paddingLeft: '16px',
      color: '#6d4c41',
      bgColor: '#fff3e0',
      fontSize: '14px',
    },
    codeBlock: {
      bgColor: '#3e2723',
      color: '#ffe0b2',
      fontSize: '13px',
      borderRadius: '6px',
      padding: '16px',
    },
    inlineCode: {
      bgColor: '#fff3e0',
      color: '#e65100',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '90%',
    },
    list: {
      color: '#4e342e',
      fontSize: '15px',
      lineHeight: '1.8',
      paddingLeft: '24px',
    },
    divider: {
      border: '1px solid #ffcc80',
      margin: '24px 0',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '8px',
      margin: '16px 0',
    },
    link: {
      color: '#ef6c00',
      textDecoration: 'underline',
    },
    root: {
      bgColor: '#fffbf5',
      padding: '20px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    },
  },
};
