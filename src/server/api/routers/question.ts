import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),
  // reportIssue: publicProcedure
  // .input(z.object({ id: z.string() }))
  // .mutation(async ({ ctx }) => {
  //   const input = ctx.body;
  //   const question = await ctx.prisma.question.findUnique({
  //     where: { id: input.id },
  //   });
  //   //question?.update({ data: { reported: true } });
  //   return `You reported issue with id ${input.id}`;
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
