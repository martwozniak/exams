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
  reportQuestionIssue: publicProcedure
  .input(z.object({ reportedQuestionId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    //console.log("API call value of reportedQuestionId: ", input.reportedQuestionId)
    const repQId = input.reportedQuestionId;
    const question = await ctx.prisma.question.update({
      where: { id: repQId },
      data: {
        reportCount: {increment: 1},
      },
    });

    return question;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
