import { getQuiz, getQuizAnswer, submitQuiz } from "@/actions/quiz";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answerArray = Object.keys(body.data)
      .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
      .map((key) => body.data[key]);

    const { result, correctAnswers } = await submitQuiz(
      Number(body.quizId),
      body.userName,
      body.userEmail,
      answerArray,
      Number(body.time)
    );

    return NextResponse.json({
      message: "success",
      correctAnswers: JSON.stringify(correctAnswers),
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "error", error });
  }
}
