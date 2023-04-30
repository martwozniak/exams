import { z } from "zod";
import type { NextRequest } from 'next/server'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */ 
  prefix: "@upstash/ratelimit",
});

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
  getOne: publicProcedure.input(z.object({ slug: z.string()})).query(({ ctx, input }) => {
    const slug = input.slug;
    return ctx.prisma.question.findUnique({
      where: { id: slug },
      include: {answers: true},
    });

  }),
  reportQuestionIssue: publicProcedure
  .input(z.object({ reportedQuestionId: z.string(), token: z.string() }))
  .mutation(async ({ ctx, input }) => {
    //console.log("API call value of reportedQuestionId: ", input.reportedQuestionId)
    const repQId = input.reportedQuestionId;
    const token = input.token;
    const { success } = await ratelimit.limit(token);
    if (!success) throw new TRPCError({code: "TOO_MANY_REQUESTS", message: "Too many requests"});
    // Ratelimit token

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
