import { signIn, useSession } from 'next-auth/react';

import { Button, Heading, MultiStep, Text } from '@ihenrits-ui/react';

import { ArrowRight, GoogleLogo } from 'phosphor-react';

import { Container, Header } from '../style';
import { ConnectItem, ConnextBox } from './styles';

export default function ConnectCalendar() {
  const session = useSession();

  // async function handleRegister(data: TRegisterFormData) {

  // }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conexte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos a medida que eles são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnextBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" onClick={() => signIn('google')}>
            <GoogleLogo />
            Conectar
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnextBox>
    </Container>
  );
}
