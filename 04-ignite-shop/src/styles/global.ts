import { globalCss } from '.';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  '::-webkit-scrollbar': {
    width: '12px',
  },

  '::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '10px',
  },

  '::-webkit-scrollbar-thumb': {
    background: '$gray500',
    borderRadius: '10px',
  },

  '::-webkit-scrollbar-thumb:hover': {
    background: '$gray500',
  },
});
