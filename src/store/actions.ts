import type { WxApiConfig } from '../types/api-config';

/** Global application state */
export interface AppState {
  /** Current markdown content */
  markdown: string;
  /** Formatted HTML output */
  formattedHtml: string;
  /** Selected template ID */
  selectedTemplateId: string;
  /** API configurations */
  apiConfigs: WxApiConfig[];
  /** Active API config ID */
  activeConfigId: string;
  /** Whether pushing to draft */
  isPushing: boolean;
  /** Error message */
  errorMessage: string;
  /** Config dialog open state */
  isConfigDialogOpen: boolean;
  /** Push dialog open state */
  isPushDialogOpen: boolean;
}

/** Action types */
export enum AppActionType {
  SET_MARKDOWN = 'SET_MARKDOWN',
  SET_TEMPLATE = 'SET_TEMPLATE',
  SET_FORMATTED_HTML = 'SET_FORMATTED_HTML',
  SET_API_CONFIGS = 'SET_API_CONFIGS',
  SET_ACTIVE_CONFIG = 'SET_ACTIVE_CONFIG',
  SET_PUSHING = 'SET_PUSHING',
  SET_ERROR = 'SET_ERROR',
  TOGGLE_CONFIG_DIALOG = 'TOGGLE_CONFIG_DIALOG',
  TOGGLE_PUSH_DIALOG = 'TOGGLE_PUSH_DIALOG',
}

/** Action payloads */
export type AppAction =
  | { type: AppActionType.SET_MARKDOWN; payload: string }
  | { type: AppActionType.SET_TEMPLATE; payload: string }
  | { type: AppActionType.SET_FORMATTED_HTML; payload: string }
  | { type: AppActionType.SET_API_CONFIGS; payload: WxApiConfig[] }
  | { type: AppActionType.SET_ACTIVE_CONFIG; payload: string }
  | { type: AppActionType.SET_PUSHING; payload: boolean }
  | { type: AppActionType.SET_ERROR; payload: string }
  | { type: AppActionType.TOGGLE_CONFIG_DIALOG; payload?: boolean }
  | { type: AppActionType.TOGGLE_PUSH_DIALOG; payload?: boolean };
