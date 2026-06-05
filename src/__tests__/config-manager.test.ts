import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigManager } from '../services/config-manager';
import * as storage from '../utils/storage';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFormData(overrides: Partial<{ name: string; appId: string; appSecret: string }> = {}) {
  return {
    name: 'My Config',
    appId: 'wxapp123',
    appSecret: 'secret456',
    ...overrides,
  };
}

/** Clear all localStorage keys used by the app before each test */
function clearStorage() {
  const keys = Object.values(storage.STORAGE_KEYS);
  for (const key of keys) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ConfigManager', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    clearStorage();
    manager = new ConfigManager();
  });

  // ---- loadConfigsAsync ----

  it('should return empty array when no configs are stored', async () => {
    const configs = await manager.loadConfigsAsync();
    expect(configs).toEqual([]);
  });

  // ---- addConfig / loadConfigsAsync round-trip ----

  it('should add a config and load it back', async () => {
    const config = await manager.addConfig(makeFormData());
    expect(config.id).toMatch(/^cfg_/);
    expect(config.name).toBe('My Config');
    expect(config.appId).toBe('wxapp123');
    expect(config.appSecret).toBe('secret456');
    expect(typeof config.createdAt).toBe('number');
    expect(typeof config.updatedAt).toBe('number');

    const loaded = await manager.loadConfigsAsync();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe(config.id);
    expect(loaded[0].name).toBe('My Config');
  });

  it('should auto-set first config as active', async () => {
    const config = await manager.addConfig(makeFormData());
    const activeId = storage.getActiveConfigId();
    expect(activeId).toBe(config.id);
  });

  it('should not override active config when adding a second config', async () => {
    const first = await manager.addConfig(makeFormData({ name: 'First' }));
    const second = await manager.addConfig(makeFormData({ name: 'Second' }));
    const activeId = storage.getActiveConfigId();
    // Active should still be the first one
    expect(activeId).toBe(first.id);
    expect(activeId).not.toBe(second.id);
  });

  // ---- getActiveConfig ----

  it('should return null when no active config is set', async () => {
    const active = await manager.getActiveConfig();
    expect(active).toBeNull();
  });

  it('should return the active config', async () => {
    const config = await manager.addConfig(makeFormData());
    const active = await manager.getActiveConfig();
    expect(active).not.toBeNull();
    expect(active!.id).toBe(config.id);
  });

  // ---- setActiveConfig ----

  it('should set the active config ID', async () => {
    const config = await manager.addConfig(makeFormData());
    manager.setActiveConfig(config.id);
    expect(storage.getActiveConfigId()).toBe(config.id);
  });

  // ---- removeConfig ----

  it('should remove a config by ID', async () => {
    const config = await manager.addConfig(makeFormData());
    expect(await manager.loadConfigsAsync()).toHaveLength(1);

    await manager.removeConfig(config.id);
    expect(await manager.loadConfigsAsync()).toHaveLength(0);
  });

  it('should update active config when the active one is removed', async () => {
    const first = await manager.addConfig(makeFormData({ name: 'First' }));
    const second = await manager.addConfig(makeFormData({ name: 'Second' }));
    expect(storage.getActiveConfigId()).toBe(first.id);

    await manager.removeConfig(first.id);
    // Active should fall back to the remaining config
    expect(storage.getActiveConfigId()).toBe(second.id);
  });

  it('should clear active config when the last config is removed', async () => {
    const config = await manager.addConfig(makeFormData());
    await manager.removeConfig(config.id);
    expect(storage.getActiveConfigId()).toBeNull();
  });

  // ---- updateConfig ----

  it('should update a config by ID', async () => {
    const config = await manager.addConfig(makeFormData());
    await manager.updateConfig(config.id, { name: 'Updated Name' });

    const loaded = await manager.loadConfigsAsync();
    expect(loaded[0].name).toBe('Updated Name');
    expect(loaded[0].appId).toBe('wxapp123'); // unchanged
  });

  it('should throw when updating non-existent config', async () => {
    await expect(
      manager.updateConfig('nonexistent', { name: 'Nope' }),
    ).rejects.toThrow('Config with id "nonexistent" not found');
  });

  // ---- saveConfigs ----

  it('should persist configs across manager instances', async () => {
    const config = await manager.addConfig(makeFormData());

    // Create a new manager — it should load the same data
    const manager2 = new ConfigManager();
    const loaded = await manager2.loadConfigsAsync();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe(config.id);
  });
});
