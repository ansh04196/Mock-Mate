"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/fileinput";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { resumeAnalyse } from "@/actions/resume";
import Markdown from 'react-markdown';


const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Only PDF of your resume
      </p>
    </>
  );
};
 
const FileUploaderComponent = ({files, setFiles}: {files: File[] | null, setFiles: any}) => {
   
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
 
  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full border-2 rounded-lg">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

const Resume = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobDesc, setJobDesc] = useState<string>('');
    const [files, setFiles] = useState<File[] | null>(null);
    const [score, setScore] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    async function handleAnalyse(){
      setIsLoading(true);

      if(files == null){ 
        setIsLoading(false);
        return;
      }

      setScore('');
      setComment('');

      const formData = new FormData();
      formData.append('file', files[0]);

      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_RESUME_URL}/analyse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(data && data.msg && data.msg === "success"){
        const resp = await resumeAnalyse(data.data?.text, jobDesc);
        setScore(resp.score);
        setComment(resp.comment);
      }

      setIsLoading(false);
    }

  
    const handleJobDescriptionChange = (event: any) => {
      setJobDesc(event.target.value);
    };

    return (
      <div className="flex flex-col gap-5 my-5">
          <h2 className="font-bold text-2xl">Resume Review</h2>
          <Textarea placeholder="Put job description here ..." rows={10} onChange={handleJobDescriptionChange} />
          <FileUploaderComponent files={files} setFiles={setFiles} />
          <Button onClick={handleAnalyse} disabled={isLoading}>Analyse</Button>

          {score && <h1>Your Resume score: {score} / 10</h1>}
          {comment && <h3>Comments: <br /><Markdown>{comment}</Markdown></h3>}

      </div>
    )
  }
  
  export default Resume;