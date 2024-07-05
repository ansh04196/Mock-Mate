import { fetchQuizAnswerofUser, getQuiz, getQuizAnswer } from "@/actions/quiz";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ID = body.id;
  const userId = body.userId;

  const data = await getQuiz(ID);
  const response = await fetchQuizAnswerofUser(Number(ID), userId);

  console.log(response);
  console.log(data);

  if (response.length > 0) {
    const quizAnswers = await getQuizAnswer(ID);
    console.log(quizAnswers);

    return NextResponse.json(
      data.length > 0
        ? {
            success: true,
            data: data[0],
            attempted: true,
            response: response[0],
            quizAnswers: quizAnswers[0],
          }
        : { error: "NO DATA FOUND" }
    );
  }

  return NextResponse.json(
    data.length > 0
      ? { success: true, data: data[0] }
      : { error: "NO DATA FOUND" }
  );
}
