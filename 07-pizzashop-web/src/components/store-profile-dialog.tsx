import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  getManagedRestaurant,
  IGetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant';
import { updateProfile } from '@/api/update-profile';

import { Button } from './ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

type TStoreProfileForm = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<IGetManagedRestaurantResponse>([
        'managed-restaurant',
      ]);

      if (cached) {
        queryClient.setQueryData<IGetManagedRestaurantResponse>(
          ['managed-restaurant'],
          {
            ...cached,
            name,
            description,
          },
        );
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TStoreProfileForm>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  });

  async function handleUpdateProfile(data: TStoreProfileForm) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success('Perfil atualizado com sucesso');
    } catch (error) {
      console.error(error);

      toast.error('Falha ao atualizar o perfil, tente novamente!');
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atuaalize as informações do seu estabelecimento visíveis para os seus
          clientes.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSubmitting}>
              Fechar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
