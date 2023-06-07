import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Image from 'next/image';

import ShoppingCartModal from '../components/ShoppingCartModal';

import logoImg from '../assets/logo.svg';

import { globalStyles } from '../styles/global';

import { Container, Header } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

      <Component {...pageProps} />

      <ShoppingCartModal />
    </Container>
  );
}
