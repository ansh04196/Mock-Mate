import { int, smallint } from "drizzle-orm/mysql-core";
import {
  bigint,
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  uuid,
  varchar,
  timestamp
} from "drizzle-orm/pg-core";

  export const UserData = pgTable("userData",{
    id: serial("id").primaryKey(),
    isPaidUser: boolean("isPaidUser"),
    apiUsed: integer("apiUsed"),
    username: varchar("username"),
    email: varchar("email")
  })

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdref: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: varchar("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const Quiz = pgTable("quiz", {
  id: serial("id").primaryKey(),
  topic: varchar("topic").notNull(),
  question: varchar("question").notNull(),
  answers: varchar("answers").notNull(),
  difficulty: varchar("difficulty").notNull(),
  totalQuestion: integer("totalQuestion").default(10),
});

export const QuizAnswer = pgTable("quizAnswer", {
  id: serial("id").primaryKey(),
  userEmail: varchar("userEmail"),
  userName: varchar("userName"),
  correctAnswers: varchar("correctAnswer"),
  points: varchar("points"),
  time: integer("time"),
  quizId: integer("quiz_id").references(() => Quiz.id),
});

export const interviewExperience = pgTable('interviewexperience', {
  interviewId: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  content: varchar('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userEmail: varchar("userEmail"),
  userName: varchar("userName"),
});

export interface MockInterviewType {
  id?: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  mockId: string;
}

export interface UserAnswerType {
  id?: number;
  mockIdref: string;
  question: string;
  correctAns: string;
  userAns: string;
  feedback: string;
  rating: string;
  userEmail: string;
  createdAt: string;
}

export interface User {
  id: number,
  clerkId: number,
  isPaidUser: boolean,
  apiUsed: number,
  username: string,
  email: string
}
