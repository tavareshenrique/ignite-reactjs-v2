/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';

// import dayjs from 'dayjs';

import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const username = String(req.query.username);

  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ message: 'Missing year or month.' });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' });
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some((availableWeekDay) => {
      return availableWeekDay.week_day === weekDay;
    });
  });

  const blockedDatesRaw = await prisma.$queryRaw`
    SELECT 
    * 
    FROM schedulings S
    WHERE S.user_id = ${user.id}
    AND DATE_FORMAT(S.date, '%Y-%m') = ${`${year}-${month}`}
  `;

  return res.json({ blockedWeekDays });
}
