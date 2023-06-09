import React from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';

import { Handbag } from '@phosphor-icons/react';

import { useShoppingCart } from 'use-shopping-cart';

import logoImg from '../../assets/logo.svg';

import { HeaderContainer, ShoppingCart, QuantityIcon } from './styles';

export function Header() {
  const { cartCount } = useShoppingCart();

  const dontHaveItemsInCart = cartCount === 0;

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <nav>
        <ul>
          <li>
            <Dialog.Trigger asChild>
              <ShoppingCart className={dontHaveItemsInCart && 'empty--cart'}>
                {!dontHaveItemsInCart && (
                  <QuantityIcon>{cartCount}</QuantityIcon>
                )}
                <Handbag weight="bold" width={24} />
              </ShoppingCart>
            </Dialog.Trigger>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
}
