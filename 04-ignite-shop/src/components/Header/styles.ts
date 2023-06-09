import { styled } from '../../styles';

export const HeaderContainer = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  ul: {
    listStyleType: 'none',
  },
});

export const ShoppingCart = styled('button', {
  position: 'relative',

  width: '3rem',
  height: '3rem',
  background: '$gray800',

  padding: '0.75rem',

  border: 0,
  borderRadius: '6px',

  svg: {
    color: '$gray300',
  },

  cursor: 'pointer',

  '&.empty--cart': {
    svg: {
      color: '$gray500',
    },
  },

  '&:hover': {
    opacity: 0.8,

    svg: {
      color: '$green500',
    },
  },
});

export const QuantityIcon = styled('span', {
  position: 'absolute',
  top: '-0.5rem',
  right: '-0.5rem',

  padding: '0.25rem 0.5rem',
  borderRadius: '50%',

  background: '$green500',
  color: '$white',
});
