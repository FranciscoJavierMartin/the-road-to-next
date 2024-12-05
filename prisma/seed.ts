import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    email: 'ticketbounty.from062@passmail.net',
  },
];

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
];

const comments = [
  { content: 'First comment from DB.' },
  { content: 'Second comment from DB.' },
  { content: 'Third comment from DB.' },
];

async function seed(): Promise<void> {
  await Promise.all([
    prisma.comment.deleteMany(),
    prisma.ticket.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  const passwordHash = await hash('adminadmin');
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      ticketId: dbTickets[0].id,
      userId: dbUsers[1].id,
    })),
  });
}

seed();
