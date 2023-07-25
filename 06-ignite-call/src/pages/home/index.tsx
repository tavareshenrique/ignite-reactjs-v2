import { Heading, Text } from '@ihenrits-ui/react';
import Image from 'next/image';

import previewImage from '../../assets/app-preview.png';

import { Container, Hero, Preview } from './style';

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>

        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Calendário escuro de Setembro de 2022, com algumas datas destacadas com a cor cinza."
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  );
}
