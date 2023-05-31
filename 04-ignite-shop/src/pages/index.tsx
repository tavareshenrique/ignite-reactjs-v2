import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import Stripe from 'stripe';

import { useKeenSlider } from 'keen-slider/react';

import { stripe } from '../lib/stripe';

import { HomeContainer, Product } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css';

interface IHomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: IHomeProps) {
  const [mounted, setMounted] = useState(false);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Product className="keen-slider__slide">
            <Image
              src={product.imageUrl}
              alt={product.name}
              title={product.name}
              width={520}
              height={520}
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100);

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formattedPrice,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
