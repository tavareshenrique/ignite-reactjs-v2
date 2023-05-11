import Image from 'next/image';

import { useKeenSlider } from 'keen-slider/react';

import ts1Image from '../assets/ts-1.png';
import ts2Image from '../assets/ts-2.png';
import ts3Image from '../assets/ts-3.png';

import { HomeContainer, Product } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css';

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image
          src={ts1Image}
          alt="Camiseta da Maratona Explorer - Modelo Preto com a imagem de um Astronauta no centro escrito Maratona Explorer por cima do Astronauta"
          title="Camiseta da Maratona Explorer - Modelo Preto com a imagem de um Astronauta no centro escrito Maratona Explorer por cima do Astronauta"
          width={520}
          height={520}
        />

        <footer>
          <strong>Camiseta Maratona Explorer</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image
          src={ts2Image}
          alt="Camiseta Ignite Lab ReactJS - Modelo Preto com a imagem da logo do React com os dizeres logo abaixo escrito: Ignite Lab ReactJS"
          title="Camiseta Ignite Lab ReactJS - Modelo Preto com a imagem da logo do React com os dizeres logo abaixo escrito: Ignite Lab ReactJS"
          width={520}
          height={520}
        />

        <footer>
          <strong>Camiseta Ignite Lab ReactJS</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image
          src={ts3Image}
          alt="Camiseta Ignite Aboard - Modelo Preto com a imagem de um capacete de astronauta com os dizeres por cima dele escrito Ignite Aboard"
          title="Camiseta Ignite Aboard - Modelo Preto com a imagem de um capacete de astronauta com os dizeres por cima dele escrito Ignite Aboard"
          width={520}
          height={520}
        />

        <footer>
          <strong>Camiseta Ignite Aboard</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
