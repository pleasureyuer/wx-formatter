import type { TemplateConfig } from '../types/template';

/** 雅致绿模板 - 清新自然，绿色为主色，适合健康/教育/环保 */
export const elegantGreen: TemplateConfig = {
  id: 'elegant-green',
  name: '雅致绿',
  description: '清新自然，绿色为主色，适合健康/教育/环保',
  style: {
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1b5e20',
      marginTop: '28px',
      marginBottom: '16px',
      textAlign: 'left',
      borderBottom: '3px solid #4caf50',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2e7d32',
      marginTop: '22px',
      marginBottom: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #a5d6a7',
    },
    h3: {
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#388e3c',
      marginTop: '18px',
      marginBottom: '10px',
      textAlign: 'left',
      borderBottom: 'none',
    },
    paragraph: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: '#33691e',
      letterSpacing: '0.5px',
      marginTop: '0px',
      marginBottom: '16px',
      textAlign: 'justify',
    },
    blockquote: {
      borderLeft: '4px solid #66bb6a',
      paddingLeft: '16px',
      color: '#558b2f',
      bgColor: '#e8f5e9',
      fontSize: '14px',
    },
    codeBlock: {
      bgColor: '#1b5e20',
      color: '#c8e6c9',
      fontSize: '13px',
      borderRadius: '6px',
      padding: '16px',
    },
    inlineCode: {
      bgColor: '#e8f5e9',
      color: '#1b5e20',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '90%',
    },
    list: {
      color: '#33691e',
      fontSize: '15px',
      lineHeight: '1.8',
      paddingLeft: '24px',
    },
    divider: {
      border: '1px solid #a5d6a7',
      margin: '24px 0',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '8px',
      margin: '16px 0',
    },
    link: {
      color: '#2e7d32',
      textDecoration: 'underline',
    },
    root: {
      bgColor: '#f9fdf6',
      padding: '20px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    },
  },
};
