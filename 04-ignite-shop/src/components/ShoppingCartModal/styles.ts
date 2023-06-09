import * as Dialog from '@radix-ui/react-dialog';

import { styled } from '../../styles';

export const DialogTitle = styled(Dialog.Title, {
  fontSize: '$lg',
  fontWeight: 'bold',
  color: '$gray100',
  lineHeight: '160%',
  fontFamily: 'Roboto',
});

export const DialogContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  minWidth: '32rem',
  borderRadius: '6px',
  padding: '2.5rem 3rem',
  background: '$gray800',

  position: 'fixed',
  bottom: '0',
  top: '0',
  right: '0',
});

export const DialogClose = styled(Dialog.Close, {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',

  background: 'transparent',
  border: 'none',
  cursor: 'pointer',

  svg: {
    color: '$gray500',
  },

  '&:hover': {
    svg: {
      color: '$gray300',
    },
  },
});

export const ProductBody = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  width: '100%',
  height: '80%',
});

export const ProductContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%',

  scrollBehavior: 'smooth',
  overflowY: 'scroll',
});

export const ProductContent = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',

  marginTop: '2rem',
});

export const ProductImage = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',
  overflow: 'hidden',

  width: '90px',
  height: '75px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});

export const ProductInfoContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',

  marginLeft: '1.25rem',

  span: {
    fontSize: '$md',
    color: '$gray300',
  },

  strong: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100',
  },

  button: {
    background: 'transparent',
    border: 'none',
    color: '$green500',
    fontSize: '$default',
    fontWeight: 'bold',

    cursor: 'pointer',

    transition: 'color 0.2s',

    '&:hover': {
      color: '$green300',
    },
  },
});

export const ProductFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-around',
  width: '100%',
  height: '10%',

  div: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    span: {
      fontSize: '$default',
      lineHeight: '160%',
    },

    '.amount': {
      fontSize: '$md',
      lineHeight: '160%',
    },

    strong: {
      fontSize: '$md',
      lineHeight: '160%',
      fontWeight: 'bold',
    },

    '.price': {
      fontSize: '$xl',
      lineHeight: '140%',
      fontWeight: 'bold',
    },
  },

  button: {
    width: '100%',

    margin: '56px 0',
  },
});
