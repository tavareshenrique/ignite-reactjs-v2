import { GetServerSideProps } from 'next';
import Image from 'next/image';

import Stripe from 'stripe';

import { useKeenSlider } from 'keen-slider/react';

import { stripe } from '../lib/stripe';

import ts1Image from '../assets/ts-1.png';
import ts2Image from '../assets/ts-2.png';
import ts3Image from '../assets/ts-3.png';

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
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product className="keen-slider__slide" key={product.id}>
          <Image
            src={product.imageUrl}
            alt="Camiseta da Maratona Explorer - Modelo Preto com a imagem de um Astronauta no centro escrito Maratona Explorer por cima do Astronauta"
            title="Camiseta da Maratona Explorer - Modelo Preto com a imagem de um Astronauta no centro escrito Maratona Explorer por cima do Astronauta"
            width={520}
            height={520}
          />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    };
  });

  return {
    props: {
      products,
    },
  };
};
