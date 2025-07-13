import prisma from '../../lib/prisma'

export const noteQueries = {
  findByUserId: (userId: string) =>
    prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),

  findByIdAndUserId: (id: string, userId: string) =>
    prisma.note.findFirst({
      where: { id, userId },
    }),

  findById: (id: string) =>
    prisma.note.findUnique({
      where: { id },
      select: { userId: true },
    }),

  create: (data: { title: string; content: string | null; userId: string }) =>
    prisma.note.create({
      data: {
        title: data.title.trim(),
        content: data.content?.trim() || null,
        userId: data.userId,
      },
    }),

  update: (id: string, data: { title?: string; content?: string | null }) =>
    prisma.note.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title.trim() }),
        ...(data.content !== undefined && {
          content: data.content?.trim() || null,
        }),
      },
    }),

  delete: (id: string) =>
    prisma.note.delete({
      where: { id },
    }),
}

export const userQueries = {
  findByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
    }),

  create: (data: { email: string; password: string }) =>
    prisma.user.create({
      data,
    }),
}
