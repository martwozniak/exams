import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const examRouter = createTRPCRouter({


  getAllExams: publicProcedure.query(({ ctx }) => {
    const exams = ctx.prisma.exam.findMany();
    return exams;
  }),
  getAllQuestionsAndAnswers: publicProcedure.query(({ ctx }) => {
    // with answers 
    //const questions = ctx.prisma.question.findMany();
    const questions = ctx.prisma.question.findMany({include: {answers: true}});
    return questions;
  // return  questions;
    //return ctx.prisma.question.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
