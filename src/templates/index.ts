import type { TemplateConfig } from '../types/template';
import type { TemplateRegistry, TemplateId } from './types';
import { simpleWhite } from './simple-white';
import { businessBlue } from './business-blue';
import { warmOrange } from './warm-orange';
import { elegantGreen } from './elegant-green';
import { techDark } from './tech-dark';
import { TEMPLATE_IDS, DEFAULT_TEMPLATE_ID } from './types';

/** Template registry - maps ID to TemplateConfig */
const templates: TemplateRegistry = {
  'simple-white': simpleWhite,
  'business-blue': businessBlue,
  'warm-orange': warmOrange,
  'elegant-green': elegantGreen,
  'tech-dark': techDark,
};

/** Get a template by ID */
export function getTemplate(id: string): TemplateConfig | undefined {
  return templates[id];
}

/** Get all templates as an array */
export function getAllTemplates(): TemplateConfig[] {
  return TEMPLATE_IDS.map((id) => templates[id]);
}

/** Get default template */
export function getDefaultTemplate(): TemplateConfig {
  return templates[DEFAULT_TEMPLATE_ID];
}

/** Check if a template ID is valid */
export function isValidTemplateId(id: string): id is TemplateId {
  return TEMPLATE_IDS.includes(id as TemplateId);
}

export { TEMPLATE_IDS, DEFAULT_TEMPLATE_ID };
export type { TemplateRegistry, TemplateId };
