import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { Heading, Text } from '@ihenrits-ui/react';

import { ClaimUsernameForm } from './components/ClaimUsernameForm';

import previewImage from '../../assets/app-preview.png';

import { Container, Hero, Preview } from './style';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>

          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />
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
    </>
  );
}
