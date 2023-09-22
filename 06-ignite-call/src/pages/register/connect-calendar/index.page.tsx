import { signIn, useSession } from 'next-auth/react';

import { Button, Heading, MultiStep, Text } from '@ihenrits-ui/react';

import { ArrowRight, Check, GoogleLogo } from 'phosphor-react';

import { Container, Header } from '../style';
import { AuthError, ConnectItem, ConnextBox } from './styles';
import { useRouter } from 'next/router';

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedId = session.status === 'authenticated';

  console.log(session);

  async function handleConnectCalendar() {
    await signIn('google');
  }

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
          {isSignedId ? (
            <Button size="sm" disabled>
              <Check />
              Conectado
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleConnectCalendar}>
              <GoogleLogo />
              Conectar
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permisões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedId}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnextBox>
    </Container>
  );
}
