import { Button, Text, TextArea, TextInput } from '@ihenrits-ui/react';

import { useRouter } from 'next/router';
import { CalendarBlank, Clock } from 'phosphor-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import dayjs from 'dayjs';

import { api } from '../../../../../lib/axios';

import { ConfirmForm, FormActions, FormError, FormHeader } from './styles';

const confirmFormSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome deve ter pelo menos 3 caracteres',
  }),
  email: z.string().email({ message: 'Digite um email válido.' }),
  observations: z.string().nullable(),
});

type TConfirmFormData = z.infer<typeof confirmFormSchema>;

interface IConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirm: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirm,
}: IConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmScheduling(data: TConfirmFormData) {
    const { email, name, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    });

    onCancelConfirm();
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY');
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]');

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          type="button"
          onClick={onCancelConfirm}
          variant="tertiary"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}
