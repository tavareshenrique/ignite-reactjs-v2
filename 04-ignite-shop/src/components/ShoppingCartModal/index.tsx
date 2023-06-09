import React from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react';

import { Button } from '../Button';

import shirtImg from '../../assets/shirt.png';

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

export default function ShoppingCartModal() {
  return (
    <Dialog.Root>
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
              {Array.from({ length: 20 }).map((_, index) => (
                <ProductContent key={index}>
                  <ProductImage>
                    <Image src={shirtImg} alt="" width={90} height={75} />
                  </ProductImage>

                  <ProductInfoContent>
                    <span>Camiseta Beyond</span>
                    <strong>R$ 79,90</strong>
                    <button className="IconButton" aria-label="Remove item">
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
              <span className="amount">3 itens</span>
            </div>

            <div>
              <strong>Valor total</strong>
              <strong className="price">R$ 270,00</strong>
            </div>

            <Button>Finalizar compra</Button>
          </ProductFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
