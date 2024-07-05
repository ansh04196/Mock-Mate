import { getALLQuizForUser, getQuizAnswer } from "@/actions/quiz";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;

    const data = await getALLQuizForUser(userId);

    return NextResponse.json(
      data.length > 0
        ? { success: true, data: data }
        : { error: "NO DATA FOUND" }
    );
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
