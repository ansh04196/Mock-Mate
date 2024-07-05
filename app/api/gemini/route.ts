// app/api/gemini/route.ts

import { isPaid } from "@/actions/payment";
import { createQuiz } from "@/actions/quiz";
import { chatSession } from "@/utils/GeminiAi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { question, difficultyLevel, questionCount } = body;

    if (!question || !difficultyLevel || !questionCount) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const InputPrompt = `Generate a set of unique, interview-style questions on the topic of "${question}" at a ${difficultyLevel} difficulty level. Each question should be presented in the following JSON format:
[
  {
    "question": "Detailed, clearly worded question text...",
    "options": {
      "A": "Specific option 1",
      "B": "Specific option 2",
      "C": "Specific option 3",
      "D": "Specific option 4"
    },
    "answer": "A" // or "B" or "C" or "D"
  }
]
Guidelines:
1. Ensure each question is unique and not repeated.
2. Questions should be similar to those asked in technical interviews at well-known technology companies.
3. All questions must be directly relevant to the specified topic.
4. Provide a diverse range of question types (e.g., conceptual understanding, problem-solving, code analysis).
5. Adjust the complexity of questions to match the specified difficulty level.
6. Ensure all options are plausible, with only one correct answer.
7. Use clear, concise language in both questions and options.
8. If applicable, include code snippets or technical terms relevant to the topic.
9. Always provide exactly four options labeled A, B, C, and D.
10. The answer should be given as a single letter: A, B, C, or D, corresponding to the correct option.
Generate ${questionCount} questions following this format and guidelines.`;

    const result = await chatSession.sendMessage(InputPrompt);

    const jsonResult = JSON.parse(
      result.response.text().replace("```json", "").replace("```", "")
    );

    const quizAnswers = jsonResult.map((question: any) => question.answer);
    const quizQuestionWithOptions = jsonResult.map((question: any) => ({
      question: question.question,
      options: question.options,
    }));

    const data = {
      topic: question,
      question: JSON.stringify(quizQuestionWithOptions),
      answers: JSON.stringify(quizAnswers),
      difficulty: difficultyLevel,
      totalQuestion: jsonResult.length,
    };

    // console.log(data);

    const { quizId } = await createQuiz(data);

    return NextResponse.json(quizId);
  } catch (error) {
    console.error("API request failed:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
