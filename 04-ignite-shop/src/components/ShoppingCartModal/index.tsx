import React from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';

import { X } from '@phosphor-icons/react';

import { useShoppingCart } from 'use-shopping-cart';

import { Button } from '../Button';

import {
  DialogTitle,
  DialogContent,
  DialogClose,
  ProductBody,
  ProductContainer,
  ProductContent,
  ProductInfoContent,
  ProductImage,
  ProductFooter,
} from './styles';

export function ShoppingCartModal() {
  const {
    cartDetails,
    formattedTotalPrice,
    cartCount,
    removeItem,
    redirectToCheckout,
  } = useShoppingCart();

  const products = Object.values(cartDetails);

  const cartCountText = cartCount > 1 ? 'itens' : 'item';

  function handleRemoveItem(productId: string) {
    removeItem(productId);
  }

  function handleCheckout() {
    try {
      redirectToCheckout();
    } catch (error) {
      alert('Erro ao finalizar compra. Tente novamente!');
    }
  }

  return (
    <Dialog.Portal>
      <DialogContent className="DialogContent">
        <ProductBody>
          <DialogTitle className="DialogTitle">Sacola de compras</DialogTitle>
          <Dialog.Description className="DialogDescription" hidden>
            Sua sacola de compras está aqui.
          </Dialog.Description>

          <DialogClose asChild>
            <button type="button">
              <X weight="bold" width={15} />
            </button>
          </DialogClose>

          <ProductContainer>
            {products.map((product, index) => (
              <ProductContent key={index}>
                <ProductImage>
                  <Image src={product.image} alt="" width={90} height={75} />
                </ProductImage>

                <ProductInfoContent>
                  <span>{product.name}</span>
                  <strong>{product.formattedValue}</strong>
                  <button
                    onClick={() => handleRemoveItem(product.id)}
                    className="IconButton"
                    aria-label="Remove item"
                  >
                    Remover
                  </button>
                </ProductInfoContent>
              </ProductContent>
            ))}
          </ProductContainer>
        </ProductBody>

        <ProductFooter>
          <div>
            <span>Quantidade</span>
            <span className="amount">
              {cartCount} {cartCountText}
            </span>
          </div>

          <div>
            <strong>Valor total</strong>
            <strong className="price">{formattedTotalPrice}</strong>
          </div>

          <Button onClick={handleCheckout}>Finalizar compra</Button>
        </ProductFooter>
      </DialogContent>
    </Dialog.Portal>
  );
}
