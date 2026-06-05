import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useAppContext } from '../store/AppContext';
import { AppActionType } from '../store/actions';
import { getAllTemplates } from '../templates';

/**
 * TemplateSelector - Dropdown selector for choosing formatting templates.
 */
const TemplateSelector: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const templates = getAllTemplates();

  const handleChange = (e: SelectChangeEvent<string>): void => {
    dispatch({ type: AppActionType.SET_TEMPLATE, payload: e.target.value });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel id="template-selector-label" sx={{ fontSize: '13px' }}>
        排版模板
      </InputLabel>
      <Select
        labelId="template-selector-label"
        value={state.selectedTemplateId}
        label="排版模板"
        onChange={handleChange}
        sx={{ fontSize: '13px', height: '32px' }}
      >
        {templates.map((tpl) => (
          <MenuItem key={tpl.id} value={tpl.id} sx={{ fontSize: '13px' }}>
            {tpl.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TemplateSelector;
