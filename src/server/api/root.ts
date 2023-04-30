import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { examRouter } from "~/server/api/routers/exam";
import { questionRouter } from "./routers/question";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  exam: examRouter,
  question: questionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
