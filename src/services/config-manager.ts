import type { WxApiConfig, WxApiConfigFormData } from '../types/api-config';
import { encrypt, decrypt } from '../utils/crypto';
import * as storage from '../utils/storage';

/** Config manager - manages WeChat API configurations with encrypted storage. */
export class ConfigManager {
  /**
   * Load configs asynchronously from localStorage.
   * Decrypts stored data and returns parsed configs.
   * @returns Array of WxApiConfig objects
   */
  async loadConfigsAsync(): Promise<WxApiConfig[]> {
    const encryptedData = storage.getApiConfigs();
    if (!encryptedData) {
      return [];
    }

    try {
      const decryptedJson = await decrypt(encryptedData);
      const configs: WxApiConfig[] = JSON.parse(decryptedJson);
      return Array.isArray(configs) ? configs : [];
    } catch {
      return [];
    }
  }

  /**
   * Save API configurations to localStorage with encryption.
   * @param configs - Array of configs to save
   */
  async saveConfigs(configs: WxApiConfig[]): Promise<void> {
    const json = JSON.stringify(configs);
    const encryptedData = await encrypt(json);
    storage.setApiConfigs(encryptedData);
  }

  /**
   * Get the currently active config.
   * @returns The active WxApiConfig or null
   */
  async getActiveConfig(): Promise<WxApiConfig | null> {
    const activeId = storage.getActiveConfigId();
    if (!activeId) {
      return null;
    }

    const configs = await this.loadConfigsAsync();
    return configs.find((c) => c.id === activeId) || null;
  }

  /**
   * Set the active config by ID.
   * @param id - The config ID to set as active
   */
  setActiveConfig(id: string): void {
    storage.setActiveConfigId(id);
  }

  /**
   * Add a new API configuration.
   * @param formData - The config form data
   */
  async addConfig(formData: WxApiConfigFormData): Promise<WxApiConfig> {
    const configs = await this.loadConfigsAsync();

    const newConfig: WxApiConfig = {
      id: generateId(),
      name: formData.name,
      appId: formData.appId,
      appSecret: formData.appSecret,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    configs.push(newConfig);
    await this.saveConfigs(configs);

    // Set as active if first config
    if (configs.length === 1) {
      this.setActiveConfig(newConfig.id);
    }

    return newConfig;
  }

  /**
   * Remove an API configuration by ID.
   * @param id - The config ID to remove
   */
  async removeConfig(id: string): Promise<void> {
    const configs = await this.loadConfigsAsync();
    const filtered = configs.filter((c) => c.id !== id);
    await this.saveConfigs(filtered);

    // Update active config if needed
    const activeId = storage.getActiveConfigId();
    if (activeId === id) {
      const newActive = filtered.length > 0 ? filtered[0].id : '';
      if (newActive) {
        this.setActiveConfig(newActive);
      } else {
        storage.remove(storage.STORAGE_KEYS.ACTIVE_CONFIG_ID);
      }
    }
  }

  /**
   * Update an existing API configuration.
   * @param id - The config ID to update
   * @param data - Partial config data to update
   */
  async updateConfig(id: string, data: Partial<WxApiConfigFormData>): Promise<void> {
    const configs = await this.loadConfigsAsync();
    const index = configs.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error(`Config with id "${id}" not found`);
    }

    configs[index] = {
      ...configs[index],
      ...data,
      updatedAt: Date.now(),
    };

    await this.saveConfigs(configs);
  }
}

/**
 * Generate a unique ID for config entries.
 * @returns A unique string ID
 */
function generateId(): string {
  return `cfg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
