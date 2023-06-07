import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import shirtImg from '../../assets/shirt.png';

import {
  DialogContent,
  ProductContent,
  ProductData,
  ProductImage,
} from './styles';
import Image from 'next/image';

export default function ShoppingCartModal() {
  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <DialogContent className="DialogContent">
          <Dialog.Title className="DialogTitle">Sacola de compras</Dialog.Title>
          <Dialog.Description className="DialogDescription" hidden>
            Sua sacola de compras está aqui.
          </Dialog.Description>

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

          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
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
