import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { signIn } from '@/api/sign-in';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signInForm = z.object({
  email: z.string().email(),
});

type TSignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: TSignInForm) {
    await authenticate({
      email: data.email,
    });

    toast.success('Enviamos um link de autenticação para seu e-mail!', {
      action: {
        label: 'Reenviar e-mail',
        onClick: () => handleSignIn(data),
      },
    });
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-4 top-8">
          <Link to="/sign-up">Novo establecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
