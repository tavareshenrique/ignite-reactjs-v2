import { useQuery } from '@tanstack/react-query';
import { Building, ChevronDown, LogOut } from 'lucide-react';

import { getManagedRestaurant } from '@/api/get-managed-restaurant';
import { getProfile } from '@/api/get-profile';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function AccountMenu() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {managedRestaurant?.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col ">
          <span>{profile?.name}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {profile?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building className="m-2 h-4 w-4" />
          <span>Perfil da Loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOut className="m-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
