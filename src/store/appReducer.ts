import type { AppState, AppAction } from './actions';
import { AppActionType } from './actions';

/** Initial application state */
export const initialAppState: AppState = {
  markdown: '',
  formattedHtml: '',
  selectedTemplateId: 'simple-white',
  apiConfigs: [],
  activeConfigId: '',
  isPushing: false,
  errorMessage: '',
  isConfigDialogOpen: false,
  isPushDialogOpen: false,
};

/** Application state reducer */
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionType.SET_MARKDOWN:
      return { ...state, markdown: action.payload };

    case AppActionType.SET_TEMPLATE:
      return { ...state, selectedTemplateId: action.payload };

    case AppActionType.SET_FORMATTED_HTML:
      return { ...state, formattedHtml: action.payload };

    case AppActionType.SET_API_CONFIGS:
      return { ...state, apiConfigs: action.payload };

    case AppActionType.SET_ACTIVE_CONFIG:
      return { ...state, activeConfigId: action.payload };

    case AppActionType.SET_PUSHING:
      return { ...state, isPushing: action.payload };

    case AppActionType.SET_ERROR:
      return { ...state, errorMessage: action.payload };

    case AppActionType.TOGGLE_CONFIG_DIALOG:
      return {
        ...state,
        isConfigDialogOpen:
          action.payload !== undefined
            ? action.payload
            : !state.isConfigDialogOpen,
      };

    case AppActionType.TOGGLE_PUSH_DIALOG:
      return {
        ...state,
        isPushDialogOpen:
          action.payload !== undefined
            ? action.payload
            : !state.isPushDialogOpen,
      };

    default:
      return state;
  }
}
