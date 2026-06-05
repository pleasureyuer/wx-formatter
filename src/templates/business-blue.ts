import type { TemplateConfig } from '../types/template';

/** 商务蓝模板 - 专业稳重，深蓝为主色，适合商业/科技文章 */
export const businessBlue: TemplateConfig = {
  id: 'business-blue',
  name: '商务蓝',
  description: '专业稳重，深蓝为主色，适合商业/科技文章',
  style: {
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#0d47a1',
      marginTop: '28px',
      marginBottom: '16px',
      textAlign: 'left',
      borderBottom: '3px solid #1565c0',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1565c0',
      marginTop: '22px',
      marginBottom: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #90caf9',
    },
    h3: {
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#1976d2',
      marginTop: '18px',
      marginBottom: '10px',
      textAlign: 'left',
      borderBottom: 'none',
    },
    paragraph: {
      fontSize: '15px',
      lineHeight: '1.8',
      color: '#37474f',
      letterSpacing: '0.5px',
      marginTop: '0px',
      marginBottom: '16px',
      textAlign: 'justify',
    },
    blockquote: {
      borderLeft: '4px solid #1976d2',
      paddingLeft: '16px',
      color: '#546e7a',
      bgColor: '#e3f2fd',
      fontSize: '14px',
    },
    codeBlock: {
      bgColor: '#1a237e',
      color: '#e8eaf6',
      fontSize: '13px',
      borderRadius: '4px',
      padding: '16px',
    },
    inlineCode: {
      bgColor: '#e3f2fd',
      color: '#0d47a1',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '90%',
    },
    list: {
      color: '#37474f',
      fontSize: '15px',
      lineHeight: '1.8',
      paddingLeft: '24px',
    },
    divider: {
      border: '1px solid #90caf9',
      margin: '24px 0',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '6px',
      margin: '16px 0',
    },
    link: {
      color: '#1565c0',
      textDecoration: 'underline',
    },
    root: {
      bgColor: '#ffffff',
      padding: '20px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    },
  },
};
