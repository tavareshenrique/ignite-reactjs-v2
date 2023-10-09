import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ihenrits-ui/react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AxiosError } from 'axios';

import { ArrowRight } from 'phosphor-react';

import { api } from '../../lib/axios';

import { Container, Form, FormError, Header } from './styles';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres.' })
    .max(20, { message: 'O nome de usuário deve ter no máximo 20 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome de usuário deve conter apenas letras e hífens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres.' }),
});

type TRegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username && typeof router.query.username === 'string') {
      setValue('username', router.query.username);
    }
  }, [router.query.username, setValue]);

  async function handleRegister(data: TRegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      });

      await router.push('/register/connect-calendar');
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        alert(err.response.data.message);

        return;
      }

      console.log(err);
    }
  }

  return (
    <>
      <NextSeo
        title="Crie uma conta | Ignite Call"
        description="Precisamos de algumas informações para criar seu perfil!"
      />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois!
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuario"
              {...register('username')}
            />

            {errors && errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />

            {errors && errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  );
}
