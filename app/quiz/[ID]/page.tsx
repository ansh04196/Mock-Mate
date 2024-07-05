"use client";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import Leaderboard from "./_components/leaderboard";

export default function Quiz() {
  const { ID } = useParams();

  const [quizData, setQuizData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerArray, setAnswerArray] = useState<any>(null);
  const [userCorrectOption, setUserCorrectOption] = useState("X");
  const [loading, setIsLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const { user } = useUser();
  const [attempted, setAttempted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (attempted) {
        clearInterval(timer);
      } else if (!loading) {
        setTimeSpent((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [attempted, loading]);

  function fetchLeaderboardData() {
    fetch(`/api/quiz/leaderboard`, {
      method: "POST",
      body: JSON.stringify({ id: ID }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLeaderboardData(data.data);
      })
      .catch((error) => console.error("Error in leaderboard:", error))
      .finally(() => setLeaderboardLoading(false));
  }

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLeaderboardLoading(true);
      fetch(`/api/quiz/fetch`, {
        method: "POST",
        body: JSON.stringify({
          userId: user?.primaryEmailAddress?.emailAddress,
          id: ID,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          setQuizData({
            questions: JSON.parse(data.data.questions),
            topic: data.data.topic,
            difficulty: data.data.difficulty,
            numberOfQuestions: JSON.parse(data.data.questions).length,
          });
          // console.log(data);
          if (data.attempted === true) {
            setAttempted(true);

            JSON.parse(data.response.correctAnswers).forEach(
              (answer: any, index: any) => {
                if (index === 0) setUserCorrectOption(answer);
                setAnswerArray((prev: any) => ({ ...prev, [index]: answer }));
              }
            );
            const quizAnswers = JSON.parse(data.quizAnswers.answers);
            setCorrectAnswers(quizAnswers);
          }
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          setIsLoading(false);
        });

      fetchLeaderboardData();
    }
  }, [user]);

  function handleSubmission() {
    setIsLoading(true);
    setLeaderboardLoading(true);

    fetch("/api/quiz/submit", {
      method: "POST",
      body: JSON.stringify({
        data: {
          ...answerArray,
          [currentQuestionIndex]: userCorrectOption,
        },
        quizId: ID,
        userName: user?.firstName + " " + user?.lastName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        time: timeSpent,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        setAttempted(true);
        setCorrectAnswers(JSON.parse(res.correctAnswers));
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));

    setTimeout(() => {
      fetchLeaderboardData();
    }, 5000);
  }

  useEffect(() => {
    const userAnswer =
      answerArray &&
      Object.keys(answerArray)
        .sort((a, b) => Number(a) - Number(b))
        .map((key) => answerArray[key]);
    let value = 0;
    userAnswer?.forEach((answer: any, index: any) => {
      if (correctAnswers[index] === answer) value++;
    });

    setTotalCorrect(value);
  }, [correctAnswers]);

  function checkIfOptionIsCorrect(option: any) {
    if (attempted && answerArray[currentQuestionIndex] === option) {
      if (
        correctAnswers[currentQuestionIndex] ===
        answerArray[currentQuestionIndex]
      ) {
        return "bg-green-300 hover:bg-green-300";
      } else {
        return "bg-red-400 hover:bg-red-400";
      }
    } else if (correctAnswers[currentQuestionIndex] === option)
      return "bg-green-300 hover:bg-green-300";
    return "";
  }

  return (
    <div>
      <div className="w-full h-full flex flex-col items-center justify-center bg-background">
        <div className="container max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <>
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-[100px] w-[full] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[full]" />
                  <Skeleton className="h-8 w-[full]" />
                  <Skeleton className="h-8 w-[full]" />
                  <Skeleton className="h-8 w-[full]" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of{" "}
                  {quizData?.numberOfQuestions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Time Spent:{" "}
                  {timeSpent >= 60
                    ? `${Math.floor(timeSpent / 60)} min ${timeSpent % 60} sec`
                    : `${timeSpent} sec`}
                </div>
              </div>
              {attempted && !loading && (
                <h3 className="text-xl font-bold mb-4 text-center">
                  Your Score{" "}
                  <span className="text-xl font-medium  mb-4 text-justify">
                    {totalCorrect}/{quizData.numberOfQuestions}
                  </span>
                </h3>
              )}
              <div className="bg-card rounded-lg p-6 shadow">
                <h2 className="text-2xl font-bold mb-4 text-justify">
                  {quizData?.questions[currentQuestionIndex]?.question}
                </h2>
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className={
                      "justify-start whitespace-normal h-auto " +
                      checkIfOptionIsCorrect("A")
                    }
                    onClick={() => {
                      if (!attempted) {
                        userCorrectOption === "A"
                          ? setUserCorrectOption("X")
                          : setUserCorrectOption("A");
                      }
                    }}
                  >
                    <span className="flex-1 text-justify">
                      {quizData?.questions[currentQuestionIndex]?.options["A"]}
                    </span>
                    {userCorrectOption === "A" && (
                      <CheckIcon className=" ml-4 h-5 w-5 text-primary " />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className={
                      "justify-start whitespace-normal h-auto " +
                      checkIfOptionIsCorrect("B")
                    }
                    onClick={() => {
                      if (!attempted) {
                        userCorrectOption === "B"
                          ? setUserCorrectOption("X")
                          : setUserCorrectOption("B");
                      }
                    }}
                  >
                    <span className="flex-1 text-justify">
                      {quizData?.questions[currentQuestionIndex]?.options["B"]}
                    </span>
                    {userCorrectOption === "B" && (
                      <CheckIcon className=" ml-4 h-5 w-5 text-primary " />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className={
                      "justify-start whitespace-normal h-auto " +
                      checkIfOptionIsCorrect("C")
                    }
                    onClick={() => {
                      if (!attempted) {
                        userCorrectOption === "C"
                          ? setUserCorrectOption("X")
                          : setUserCorrectOption("C");
                      }
                    }}
                  >
                    <span className="flex-1 text-justify">
                      {quizData?.questions[currentQuestionIndex]?.options["C"]}
                    </span>
                    {userCorrectOption === "C" && (
                      <CheckIcon className=" ml-4 h-5 w-5 text-primary " />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className={
                      "justify-start whitespace-normal h-auto " +
                      checkIfOptionIsCorrect("D")
                    }
                    onClick={() => {
                      if (!attempted) {
                        userCorrectOption === "D"
                          ? setUserCorrectOption("X")
                          : setUserCorrectOption("D");
                      }
                    }}
                  >
                    <span className="flex-1 text-justify">
                      {quizData?.questions[currentQuestionIndex]?.options["D"]}
                    </span>
                    {userCorrectOption === "D" && (
                      <CheckIcon className=" ml-4 h-5 w-5 text-primary " />
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev - 1);
                    setUserCorrectOption(
                      answerArray[currentQuestionIndex - 1] || "X"
                    );
                    if (!attempted) {
                      setAnswerArray((prev: any) => ({
                        ...prev,
                        [currentQuestionIndex]: userCorrectOption,
                      }));
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  className="ml-4"
                  onClick={() => {
                    console.log(answerArray);

                    if (
                      currentQuestionIndex !==
                      quizData.numberOfQuestions - 1
                    ) {
                      setCurrentQuestionIndex((prev) => prev + 1);
                      setUserCorrectOption(
                        (answerArray &&
                          answerArray[currentQuestionIndex + 1]) ||
                          "X"
                      );
                      if (!attempted) {
                        setAnswerArray((prev: any) => ({
                          ...prev,
                          [currentQuestionIndex]: userCorrectOption,
                        }));
                      }
                    } else {
                      setAnswerArray((prev: any) => ({
                        ...prev,
                        [currentQuestionIndex]: userCorrectOption,
                      }));
                      handleSubmission();
                      setAttempted(true);
                    }
                  }}
                  disabled={
                    attempted &&
                    currentQuestionIndex === quizData?.numberOfQuestions - 1
                  }
                >
                  {currentQuestionIndex === quizData?.numberOfQuestions - 1
                    ? "Submit"
                    : attempted ||
                      (userCorrectOption && userCorrectOption !== "X")
                    ? "Next"
                    : "Skip"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {attempted && (
        <div className=" relative">
          {leaderboardLoading && (
            <div className=" absolute inset-0 grid place-items-center backdrop-blur-sm z-10">
              <Loader className="mr-2 h-6 w-6 animate-spin backdrop-blur-sm	" />
            </div>
          )}
          <Leaderboard leaderboardData={leaderboardData} />
        </div>
      )}
    </div>
  );
}
