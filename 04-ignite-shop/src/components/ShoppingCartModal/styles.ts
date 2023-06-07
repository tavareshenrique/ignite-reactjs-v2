import * as Dialog from '@radix-ui/react-dialog';

import { styled } from '../../styles';

export const DialogContent = styled(Dialog.Content, {
  minWidth: '32rem',
  borderRadius: '6px',
  padding: '2.5rem 3rem',
  background: '$gray800',

  position: 'fixed',
  bottom: '0',
  top: '0',
  right: '0',
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

export const ProductData = styled('div', {
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

    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
});
