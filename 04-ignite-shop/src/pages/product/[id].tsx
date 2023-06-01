import { GetStaticPaths, GetStaticProps } from 'next';

import Image from 'next/image';
import { useRouter } from 'next/router';

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

  function handleByProduct() {
    console.log('product', product);
  }

  if (isFallback) return <p>Carregando...</p>;

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleByProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
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
