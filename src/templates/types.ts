import type { TemplateConfig } from '../types/template';

/** Template registry type */
export type TemplateRegistry = Record<string, TemplateConfig>;

/** All available template IDs */
export const TEMPLATE_IDS = [
  'simple-white',
  'business-blue',
  'warm-orange',
  'elegant-green',
  'tech-dark',
] as const;

/** Template ID type */
export type TemplateId = (typeof TEMPLATE_IDS)[number];

/** Default template ID */
export const DEFAULT_TEMPLATE_ID: TemplateId = 'simple-white';
