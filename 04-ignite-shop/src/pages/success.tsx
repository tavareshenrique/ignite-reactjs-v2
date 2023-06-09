import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Stripe from 'stripe';

import { stripe } from '../lib/stripe';

import {
  ImageContainer,
  ImageContent,
  ImageRoundContent,
  SuccessContainer,
} from '../styles/pages/success';
import { useShoppingCart } from 'use-shopping-cart';
import { useEffect } from 'react';

interface ISuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: ISuccessProps) {
  const { clearCart, cartDetails } = useShoppingCart();

  const amounShirtPurchased = products.length;

  useEffect(() => {
    const cartItems = Object.values(cartDetails);
    const cartItemsQuantity = cartItems.length;

    if (cartItemsQuantity > 0) {
      clearCart();
    }
  }, [cartDetails, clearCart]);

  function renderOneShirtPurchased() {
    return (
      <>
        <ImageContent>
          <Image src={products[0].imageUrl} width={120} height={120} alt="" />
        </ImageContent>

        <p>
          🎉 Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>{products[0].name}</strong> já está a caminho da sua casa.
        </p>
      </>
    );
  }

  function renderMoreThanOneShirtPurchased() {
    return (
      <>
        <ImageContainer>
          {products.map((product) => (
            <ImageRoundContent key={product.name}>
              <Image
                src={product.imageUrl}
                width={120}
                height={120}
                alt={product.name}
              />
            </ImageRoundContent>
          ))}
        </ImageContainer>

        <p>
          🎉 Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {amounShirtPurchased} camisetas já está a caminho da sua casa.
        </p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        {amounShirtPurchased > 1
          ? renderMoreThanOneShirtPurchased()
          : renderOneShirtPurchased()}

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;

  const products = session.line_items.data.map((lineItem) => {
    const product = lineItem.price.product as Stripe.Product;

    return {
      name: product.name,
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,

      // {
      //   name: product.name,
      //   imageUrl: product.images[0],
      // },
    },
  };
};
