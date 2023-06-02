import { useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

import axios from 'axios';
import Stripe from 'stripe';

import { stripe } from '../../lib/stripe';

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';

type TProduct = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  defaultPriceId: string;
};

interface IProductProps {
  product: TProduct;
}

export default function Product({ product }: IProductProps) {
  const { isFallback } = useRouter();

  const [isCreatingSessionCheckout, setIsCreatingSessionCheckout] =
    useState(false);

  async function handleByProduct() {
    try {
      setIsCreatingSessionCheckout(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingSessionCheckout(false);

      alert('Falha ao redirectionar ao checkout.');
    }
  }

  if (isFallback) return <p>Carregando...</p>;

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            onClick={handleByProduct}
            disabled={isCreatingSessionCheckout}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'prod_Nwn6MLpPjVdzOA',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  IProductProps,
  { id: string }
> = async (ctx) => {
  const productId = ctx.params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price.unit_amount / 100);

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: formattedPrice,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
