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
  getSpecificExam: publicProcedure.input(z.object({ examId: z.string()})).query(({ ctx,input }) => {
    const examId = input.examId;
    const exam = ctx.prisma.exam.findUnique({
      where: { id: examId },
      include: {questions: true},
    });
    return exam;
  }),
  getAllQuestionsAndAnswers: publicProcedure.query(({ ctx }) => {
 
    const questions = ctx.prisma.question.findMany({include: {answers: true}});
    return questions;
  }),
  getNQuestionsAndAnswers: publicProcedure.input(z.object({ numberOfQuestions: z.number()})).query(({ ctx,input }) => {
    const questionLimit  = Number(input.numberOfQuestions);
    const questions = ctx.prisma.question.findMany({
      take: questionLimit,
      include: {answers: true}});
    return questions;

  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
