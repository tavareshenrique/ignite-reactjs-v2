import { useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

// import axios from 'axios';
import Stripe from 'stripe';

import { useShoppingCart } from 'use-shopping-cart';

import { stripe } from '../../lib/stripe';

import { Button } from '../../components/Button';

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
  priceValue: number;
};

interface IProductProps {
  product: TProduct;
}

export default function Product({ product }: IProductProps) {
  const { isFallback } = useRouter();

  const { addItem, cartDetails } = useShoppingCart();

  // const [isCreatingSessionCheckout, setIsCreatingSessionCheckout] =
  //   useState(false);

  const [isProductBeingAddedToCart, setIsProductBeingAddedToCart] =
    useState(false);

  async function handleByProduct() {
    try {
      setIsProductBeingAddedToCart(true);

      const productInCart = cartDetails[product.defaultPriceId];

      if (productInCart) {
        alert('Produto já adicionado ao carrinho.');

        return;
      }

      addItem({
        id: product.defaultPriceId,
        name: product.name,
        description: product.description,
        image: product.imageUrl,
        price_id: product.defaultPriceId,
        price: product.priceValue,
        currency: 'BRL',
        quantity: 1,
      });
    } catch (err) {
      alert('Falha ao adicionar o produto ao carrinho.');
    } finally {
      setIsProductBeingAddedToCart(false);
    }

    // try {
    //   setIsCreatingSessionCheckout(true);

    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.defaultPriceId,
    //   });

    //   const { checkoutUrl } = response.data;

    //   window.location.href = checkoutUrl;
    // } catch (err) {
    //   setIsCreatingSessionCheckout(false);

    //   alert('Falha ao redirectionar ao checkout.');
    // }
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

          <Button
            onClick={handleByProduct}
            disabled={isProductBeingAddedToCart}
          >
            Comprar agora
          </Button>
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
        priceValue: price.unit_amount,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
