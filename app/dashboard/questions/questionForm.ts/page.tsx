"use client"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Check,
  CopyCheck,
  CopyIcon,
  LoaderCircle,
  ShareIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isPaid } from "@/actions/payment";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function QuestionForm() {
  const [loading, setLoading] = useState(false);
  const [quizLink, setQuizLink] = useState<any>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const router = useRouter();

  const {user} = useUser()

  const handleFormSubmit = async(e: any) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const question = formData.get("question");
    const difficultyLevel = formData.get("difficulty");
    const questionCount = formData.get("total");

    const hasPaid = await isPaid(JSON.stringify(user));
    if(!hasPaid.possible){
      toast("Free Plan Exhausted")
      setLoading(false)
      return
    }
    fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        difficultyLevel: difficultyLevel,
        questionCount: questionCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuizLink(data);
        if (data.error) {
          console.error(data.error);
          form.reset();
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  };

  const copyTextToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate Question</CardTitle>
        {/* <CardDescription>
            Enter the topi
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleFormSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="question">Topic</Label>
            <Textarea
              id="question"
              name="question"
              placeholder="Enter the Topic of the question you want to generate"
              className="min-h-[100px]"
              disabled={loading || quizLink}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" disabled={loading || quizLink}>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="total">Total Questions</Label>
              <Input
                id="total"
                name="total"
                type="number"
                placeholder="Enter total questions"
                disabled={loading || quizLink}
              />
            </div>
          </div>
          <Button
            type={quizLink ? "button" : "submit"}
            className="w-full"
            onClick={() => {
              if (quizLink) {
                router.push("/quiz/" + quizLink);
              }
            }}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" /> Generating from AI{" "}
              </>
            ) : quizLink ? (
              "Start"
            ) : (
              "Generate"
            )}
          </Button>
        </form>
        {quizLink && (
          <div className=" mt-4 flex gap-4 justify-center">
            <Button variant="secondary">
              <ShareIcon className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                copyTextToClipboard(
                  process.env.NEXT_PUBLIC_SITE_URL + "/quiz/" + quizLink
                ).then(() => {
                  setLinkCopied(true);
                  setTimeout(() => {
                    setLinkCopied(false);
                  }, 5000);
                });
              }}
            >
              {linkCopied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <CopyIcon className="mr-2 h-4 w-4" />
              )}
              Copy Link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
