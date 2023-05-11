import Image from 'next/image';

import ts1Image from '../assets/ts-1.png';
import ts2Image from '../assets/ts-2.png';
// import ts3Image from '../assets/ts-3.png';

import { HomeContainer, Product } from '../styles/pages/home';

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image
          src={ts1Image}
          alt="Camiseta da Maratona Explorer - Modelo Preto com a Imagem de um Astronauta no centro escrito Maratona Explorer por cima do Astronauta"
          title="Camiseta da Maratona Explorer - Modelo Preto com a Imagem de um Astronauta no centro escrito Maratona Explorer por cima do Astronauta"
          width={520}
          height={520}
        />

        <footer>
          <strong>Camiseta Maratona Explorer</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image
          src={ts2Image}
          alt="Camiseta Ignite Lab ReactJS - Modelo Preto com a Imagem da logo do React com os dizeres logo abaixo escrito: Ignite Lab ReactJS"
          title="Camiseta Ignite Lab ReactJS - Modelo Preto com a Imagem da logo do React com os dizeres logo abaixo escrito: Ignite Lab ReactJS"
          width={520}
          height={520}
        />

        <footer>
          <strong>Camiseta Ignite Lab ReactJS</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
