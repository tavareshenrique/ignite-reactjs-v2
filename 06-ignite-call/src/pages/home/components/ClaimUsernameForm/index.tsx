import { Button, TextInput } from '@ihenrits-ui/react';
import { ArrowRight } from 'phosphor-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from './styles';

const claimUsernameFormSchema = z.object({
  username: z.string().min(3).max(20),
});

type TClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<TClaimUsernameFormData>();

  async function handleClaimUsername(data: TClaimUsernameFormData) {
    console.log(data);
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  );
}
