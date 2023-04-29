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
  reportIssue: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation((opts) => {
    // Increase the reportIssue field by 1
    
    // Here some login stuff would happen
    // Find question with id and update the reportIssue field
    
    //const question = ctx.prisma.question.findUnique({where: {id: opts.input.id}});

    
    // return the updated question


    return {
      user: {
        name: opts.input.id,
        role: 'ADMIN',
      },
    }}),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
