import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

import * as Dialog from '@radix-ui/react-dialog';

import { CartProvider } from 'use-shopping-cart';

import { ShoppingCartModal, Header } from '../components';

import { globalStyles } from '../styles/global';

import { Container } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Container>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/`}
        currency="BRL"
        allowedCountries={['BR']}
        shouldPersist
        billingAddressCollection
      >
        <Dialog.Root>
          <Header />

          <Component {...pageProps} />

          <ShoppingCartModal />
        </Dialog.Root>
      </CartProvider>
    </Container>
  );
}
