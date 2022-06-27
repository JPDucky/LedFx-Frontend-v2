/* eslint-disable react/require-default-props */
import React from 'react';

import axios from 'axios';
import { Slide, MenuItem } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

export const cloud = axios.create({
  baseURL: 'https://strapi.yeonv.com',
});

export const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

type Props = { _?: never; children?: any; className?: any; onClick?: any };

export const MuiMenuItem = React.forwardRef<HTMLLIElement, Props>(
  (props, ref) => {
    return <MenuItem ref={ref} {...props} />;
  }
);
