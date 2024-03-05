import { http, HttpResponse } from 'msw';

import { IUpdateProfileBody } from '../update-profile';

export const updateProfileMock = http.put<never, IUpdateProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json();

    if (name === 'Rocket Pizza') {
      return new HttpResponse(null, { status: 204 });
    }

    return new HttpResponse(null, { status: 400 });
  },
);
