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
  getNQuestionsAndAnswers: publicProcedure.input(z.object({ numberOfQuestions: z.number()})).query(({ ctx,input }) => {
    const questionLimit  = Number(input.numberOfQuestions);
    const countAllquestions = ctx.prisma.question.count();

    const questions = ctx.prisma.question.findMany({
      take: questionLimit,
      include: {answers: true}});
    return questions;

  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
