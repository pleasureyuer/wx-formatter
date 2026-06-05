import { describe, it, expect } from 'vitest';
import { appReducer, initialAppState } from '../store/appReducer';
import { AppActionType } from '../store/actions';
import type { AppState } from '../store/actions';
import type { WxApiConfig } from '../types/api-config';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(overrides: Partial<WxApiConfig> = {}): WxApiConfig {
  return {
    id: 'cfg_1',
    name: 'Test Config',
    appId: 'wx123456',
    appSecret: 'secret123',
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('appReducer - initial state', () => {
  it('should have empty markdown', () => {
    expect(initialAppState.markdown).toBe('');
  });

  it('should have empty formattedHtml', () => {
    expect(initialAppState.formattedHtml).toBe('');
  });

  it('should default to simple-white template', () => {
    expect(initialAppState.selectedTemplateId).toBe('simple-white');
  });

  it('should have empty apiConfigs array', () => {
    expect(initialAppState.apiConfigs).toEqual([]);
  });

  it('should have empty activeConfigId', () => {
    expect(initialAppState.activeConfigId).toBe('');
  });

  it('should not be pushing', () => {
    expect(initialAppState.isPushing).toBe(false);
  });

  it('should have empty errorMessage', () => {
    expect(initialAppState.errorMessage).toBe('');
  });

  it('should have dialogs closed', () => {
    expect(initialAppState.isConfigDialogOpen).toBe(false);
    expect(initialAppState.isPushDialogOpen).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// SET_MARKDOWN
// ---------------------------------------------------------------------------

describe('appReducer - SET_MARKDOWN', () => {
  it('should update markdown in state', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_MARKDOWN,
      payload: '# Hello',
    });
    expect(state.markdown).toBe('# Hello');
  });

  it('should not mutate other state properties', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_MARKDOWN,
      payload: '# Hello',
    });
    expect(state.selectedTemplateId).toBe('simple-white');
    expect(state.formattedHtml).toBe('');
  });

  it('should replace existing markdown', () => {
    const prev = { ...initialAppState, markdown: 'old' };
    const state = appReducer(prev, {
      type: AppActionType.SET_MARKDOWN,
      payload: 'new',
    });
    expect(state.markdown).toBe('new');
  });
});

// ---------------------------------------------------------------------------
// SET_TEMPLATE
// ---------------------------------------------------------------------------

describe('appReducer - SET_TEMPLATE', () => {
  it('should update selectedTemplateId', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_TEMPLATE,
      payload: 'tech-dark',
    });
    expect(state.selectedTemplateId).toBe('tech-dark');
  });

  it('should not mutate other state properties', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_TEMPLATE,
      payload: 'business-blue',
    });
    expect(state.markdown).toBe('');
    expect(state.formattedHtml).toBe('');
  });
});

// ---------------------------------------------------------------------------
// SET_FORMATTED_HTML
// ---------------------------------------------------------------------------

describe('appReducer - SET_FORMATTED_HTML', () => {
  it('should update formattedHtml', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_FORMATTED_HTML,
      payload: '<section>...</section>',
    });
    expect(state.formattedHtml).toBe('<section>...</section>');
  });

  it('should allow empty html', () => {
    const prev = { ...initialAppState, formattedHtml: '<p>old</p>' };
    const state = appReducer(prev, {
      type: AppActionType.SET_FORMATTED_HTML,
      payload: '',
    });
    expect(state.formattedHtml).toBe('');
  });
});

// ---------------------------------------------------------------------------
// SET_API_CONFIGS
// ---------------------------------------------------------------------------

describe('appReducer - SET_API_CONFIGS', () => {
  it('should update apiConfigs', () => {
    const configs = [makeConfig(), makeConfig({ id: 'cfg_2', name: 'Second' })];
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_API_CONFIGS,
      payload: configs,
    });
    expect(state.apiConfigs).toHaveLength(2);
    expect(state.apiConfigs[0].name).toBe('Test Config');
  });

  it('should accept empty array', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_API_CONFIGS,
      payload: [],
    });
    expect(state.apiConfigs).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// SET_ACTIVE_CONFIG
// ---------------------------------------------------------------------------

describe('appReducer - SET_ACTIVE_CONFIG', () => {
  it('should update activeConfigId', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_ACTIVE_CONFIG,
      payload: 'cfg_abc',
    });
    expect(state.activeConfigId).toBe('cfg_abc');
  });
});

// ---------------------------------------------------------------------------
// SET_PUSHING
// ---------------------------------------------------------------------------

describe('appReducer - SET_PUSHING', () => {
  it('should set isPushing to true', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_PUSHING,
      payload: true,
    });
    expect(state.isPushing).toBe(true);
  });

  it('should set isPushing to false', () => {
    const prev = { ...initialAppState, isPushing: true };
    const state = appReducer(prev, {
      type: AppActionType.SET_PUSHING,
      payload: false,
    });
    expect(state.isPushing).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// SET_ERROR
// ---------------------------------------------------------------------------

describe('appReducer - SET_ERROR', () => {
  it('should set errorMessage', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.SET_ERROR,
      payload: 'Something went wrong',
    });
    expect(state.errorMessage).toBe('Something went wrong');
  });

  it('should clear errorMessage', () => {
    const prev = { ...initialAppState, errorMessage: 'old error' };
    const state = appReducer(prev, {
      type: AppActionType.SET_ERROR,
      payload: '',
    });
    expect(state.errorMessage).toBe('');
  });
});

// ---------------------------------------------------------------------------
// TOGGLE_CONFIG_DIALOG
// ---------------------------------------------------------------------------

describe('appReducer - TOGGLE_CONFIG_DIALOG', () => {
  it('should toggle from false to true', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.TOGGLE_CONFIG_DIALOG,
    });
    expect(state.isConfigDialogOpen).toBe(true);
  });

  it('should toggle from true to false', () => {
    const prev = { ...initialAppState, isConfigDialogOpen: true };
    const state = appReducer(prev, {
      type: AppActionType.TOGGLE_CONFIG_DIALOG,
    });
    expect(state.isConfigDialogOpen).toBe(false);
  });

  it('should set explicit value when payload is provided', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.TOGGLE_CONFIG_DIALOG,
      payload: true,
    });
    expect(state.isConfigDialogOpen).toBe(true);

    const state2 = appReducer(state, {
      type: AppActionType.TOGGLE_CONFIG_DIALOG,
      payload: false,
    });
    expect(state2.isConfigDialogOpen).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// TOGGLE_PUSH_DIALOG
// ---------------------------------------------------------------------------

describe('appReducer - TOGGLE_PUSH_DIALOG', () => {
  it('should toggle from false to true', () => {
    const state = appReducer(initialAppState, {
      type: AppActionType.TOGGLE_PUSH_DIALOG,
    });
    expect(state.isPushDialogOpen).toBe(true);
  });

  it('should toggle from true to false', () => {
    const prev = { ...initialAppState, isPushDialogOpen: true };
    const state = appReducer(prev, {
      type: AppActionType.TOGGLE_PUSH_DIALOG,
    });
    expect(state.isPushDialogOpen).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Unknown action / immutability
// ---------------------------------------------------------------------------

describe('appReducer - edge cases', () => {
  it('should return current state for unknown action type', () => {
    const state = appReducer(initialAppState, {
      type: 'UNKNOWN' as AppActionType,
    } as any);
    expect(state).toBe(initialAppState);
  });

  it('should not mutate previous state (immutability)', () => {
    const prev: AppState = { ...initialAppState, markdown: 'original' };
    const prevFrozen = { ...prev };
    appReducer(prev, {
      type: AppActionType.SET_MARKDOWN,
      payload: 'changed',
    });
    // Previous state must be unchanged
    expect(prev.markdown).toBe(prevFrozen.markdown);
    expect(prev).toEqual(prevFrozen);
  });
});
