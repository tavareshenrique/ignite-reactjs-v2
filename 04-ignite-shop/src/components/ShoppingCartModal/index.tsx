import React from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react';

import shirtImg from '../../assets/shirt.png';

import {
  DialogTitle,
  DialogContent,
  DialogClose,
  ProductContent,
  ProductData,
  ProductImage,
} from './styles';

export default function ShoppingCartModal() {
  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <DialogContent className="DialogContent">
          <DialogTitle className="DialogTitle">Sacola de compras</DialogTitle>
          <Dialog.Description className="DialogDescription" hidden>
            Sua sacola de compras está aqui.
          </Dialog.Description>

          <DialogClose asChild>
            <button type="button">
              <X weight="bold" width={15} />
            </button>
          </DialogClose>

          <ProductContent>
            <ProductImage>
              <Image src={shirtImg} alt="" width={90} height={75} />
            </ProductImage>

            <ProductData>
              <span>Camiseta Beyond</span>
              <strong>R$ 79,90</strong>
              <button className="IconButton" aria-label="Remove item">
                Remover
              </button>
            </ProductData>
          </ProductContent>

          <ProductContent>
            <ProductImage>
              <Image src={shirtImg} alt="" width={90} height={75} />
            </ProductImage>

            <ProductData>
              <span>Camiseta Beyond</span>
              <strong>R$ 79,90</strong>
              <button className="IconButton" aria-label="Remove item">
                Remover
              </button>
            </ProductData>
          </ProductContent>

          <ProductContent>
            <ProductImage>
              <Image src={shirtImg} alt="" width={90} height={75} />
            </ProductImage>

            <ProductData>
              <span>Camiseta Beyond</span>
              <strong>R$ 79,90</strong>
              <button className="IconButton" aria-label="Remove item">
                Remover
              </button>
            </ProductData>
          </ProductContent>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              {/* <Cross2Icon /> */}
              Fechar
            </button>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
