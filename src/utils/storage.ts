/** localStorage key constants */
const STORAGE_KEYS = {
  API_CONFIGS: 'wx_formatter_configs',
  ACTIVE_CONFIG_ID: 'wx_formatter_active_config',
  MARKDOWN_CONTENT: 'wx_formatter_markdown',
  SELECTED_TEMPLATE: 'wx_formatter_template',
} as const;

/**
 * Get a value from localStorage.
 * @param key - The storage key
 * @returns The stored value or null if not found
 */
export function get(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    console.warn(`Failed to read from localStorage: ${key}`);
    return null;
  }
}

/**
 * Set a value in localStorage.
 * @param key - The storage key
 * @param value - The value to store
 */
export function set(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    console.warn(`Failed to write to localStorage: ${key}`);
  }
}

/**
 * Remove a value from localStorage.
 * @param key - The storage key to remove
 */
export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    console.warn(`Failed to remove from localStorage: ${key}`);
  }
}

/**
 * Get API configurations from localStorage.
 * @returns The encrypted config string or null
 */
export function getApiConfigs(): string | null {
  return get(STORAGE_KEYS.API_CONFIGS);
}

/**
 * Save API configurations to localStorage.
 * @param encryptedConfigs - The encrypted config string
 */
export function setApiConfigs(encryptedConfigs: string): void {
  set(STORAGE_KEYS.API_CONFIGS, encryptedConfigs);
}

/**
 * Get the active config ID.
 * @returns The active config ID or null
 */
export function getActiveConfigId(): string | null {
  return get(STORAGE_KEYS.ACTIVE_CONFIG_ID);
}

/**
 * Set the active config ID.
 * @param id - The config ID to set as active
 */
export function setActiveConfigId(id: string): void {
  set(STORAGE_KEYS.ACTIVE_CONFIG_ID, id);
}

/**
 * Get saved markdown content.
 * @returns The saved markdown or null
 */
export function getMarkdownContent(): string | null {
  return get(STORAGE_KEYS.MARKDOWN_CONTENT);
}

/**
 * Save markdown content.
 * @param markdown - The markdown text to save
 */
export function setMarkdownContent(markdown: string): void {
  set(STORAGE_KEYS.MARKDOWN_CONTENT, markdown);
}

/**
 * Get the selected template ID.
 * @returns The template ID or null
 */
export function getSelectedTemplateId(): string | null {
  return get(STORAGE_KEYS.SELECTED_TEMPLATE);
}

/**
 * Save the selected template ID.
 * @param templateId - The template ID
 */
export function setSelectedTemplateId(templateId: string): void {
  set(STORAGE_KEYS.SELECTED_TEMPLATE, templateId);
}

export { STORAGE_KEYS };
