import React from 'react';
import ThemeProvider from './ThemeProvider';

const Root = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

export default Root;
