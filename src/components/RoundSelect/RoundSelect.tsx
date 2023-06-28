import styled from '@emotion/styled';
import { Select, SelectProps } from 'antd';
import { FC } from 'react';

export const RoundedSelect = styled(Select)`
  .tl-select-selector,
  .tl-select-selection-item {
    border-radius: 999px !important;
  }
` as FC<SelectProps>;
