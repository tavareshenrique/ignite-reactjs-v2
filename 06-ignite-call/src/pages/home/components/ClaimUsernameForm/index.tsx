import { useRouter } from 'next/router';

import { Button, Text, TextInput } from '@ihenrits-ui/react';
import { ArrowRight } from 'phosphor-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormAnnotation } from './styles';

const FORM_ANNOTATION_DEFAULT_MESSAGE = 'Digite o nome do usuário';

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres.' })
    .max(20, { message: 'O nome de usuário deve ter no máximo 20 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome de usuário deve conter apenas letras e hífens.',
    })
    .transform((username) => username.toLowerCase()),
});

type TClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  const usernameHasError = Boolean(errors.username);

  const formAnnotationMessage = errors.username
    ? errors.username.message
    : FORM_ANNOTATION_DEFAULT_MESSAGE;

  async function handleClaimUsername(data: TClaimUsernameFormData) {
    const { username } = data;

    await router.push(`/register/?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation error={usernameHasError}>
        <Text size="sm">{formAnnotationMessage}</Text>
      </FormAnnotation>
    </>
  );
}
