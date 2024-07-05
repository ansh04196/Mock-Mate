import { quizLeaderboard } from "@/actions/quiz";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const quizId = body.id;

  const data = await quizLeaderboard(Number(quizId));
  console.log(data);

  return NextResponse.json({ success: true, data });
}
