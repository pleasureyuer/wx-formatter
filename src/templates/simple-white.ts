import type { TemplateConfig } from '../types/template';

/** 简约白模板 - 干净清爽，黑灰配色，适合文字类文章 */
export const simpleWhite: TemplateConfig = {
  id: 'simple-white',
  name: '简约白',
  description: '干净清爽，黑灰配色，适合文字类文章',
  style: {
    h1: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginTop: '24px',
      marginBottom: '16px',
      textAlign: 'left',
      borderBottom: '2px solid #e0e0e0',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333333',
      marginTop: '20px',
      marginBottom: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #eeeeee',
    },
    h3: {
      fontSize: '17px',
      fontWeight: 'bold',
      color: '#444444',
      marginTop: '16px',
      marginBottom: '10px',
      textAlign: 'left',
      borderBottom: 'none',
    },
    paragraph: {
      fontSize: '15px',
      lineHeight: '1.75',
      color: '#333333',
      letterSpacing: '0.5px',
      marginTop: '0px',
      marginBottom: '16px',
      textAlign: 'justify',
    },
    blockquote: {
      borderLeft: '4px solid #bdbdbd',
      paddingLeft: '16px',
      color: '#666666',
      bgColor: '#fafafa',
      fontSize: '14px',
    },
    codeBlock: {
      bgColor: '#f5f5f5',
      color: '#333333',
      fontSize: '13px',
      borderRadius: '4px',
      padding: '16px',
    },
    inlineCode: {
      bgColor: '#f0f0f0',
      color: '#c7254e',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '90%',
    },
    list: {
      color: '#333333',
      fontSize: '15px',
      lineHeight: '1.75',
      paddingLeft: '24px',
    },
    divider: {
      border: '1px solid #e0e0e0',
      margin: '24px 0',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '4px',
      margin: '16px 0',
    },
    link: {
      color: '#1976d2',
      textDecoration: 'none',
    },
    root: {
      bgColor: '#ffffff',
      padding: '20px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    },
  },
};
