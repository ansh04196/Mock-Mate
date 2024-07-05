"use client";
import Link from "next/link";

// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createExperience, getExperiences } from "@/actions/experience";
import { FiSearch } from "react-icons/fi";

export default function InterviewExperience() {
  const [isOpened, setisOpened] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [listExp, setListExp] = useState<Array<any>>([]);
  const listExpFiltered = listExp?.filter((x) => (x?.title?.indexOf(query) >=0) || (x?.content?.indexOf(query) >=0));

  async function handleSubmit(){
    setIsLoading(true)
    const result = await createExperience(
      user?.fullName!,
      user?.primaryEmailAddress?.emailAddress!,
      title,
      content
    )
    setIsLoading(false)
    fetchdata()
    setTitle("");
    setContent("");
    setisOpened(false);
  }

  async function fetchdata(str:string = "") {
    const datas = await getExperiences(str);
    console.log(datas)
    setListExp(datas?.result!);
  }

  useEffect(()=>{
    fetchdata();
  }, [])

  // async function handleSearch() {
  //   fetchdata(query)
  // }

  return (
      <div className="flex flex-col min-h-screen">
      <main className="flex-1 gap-8 p-4 md:p-6 flex flex-col">
      <div className="space-y-8">
          <SearchBar query={query} setQuery={setQuery} />
          { isOpened ?
            (<Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter your experience title" 
                      onChange={(e)=>setTitle(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Share your interview experience"
                      className="min-h-[200px]"
                      onChange={(e)=>setContent(e.target.value)}
                    />
                  </div>
                  <div className="text-right"><Button className="w-fit" onClick={handleSubmit} disabled={isLoading}>Submit</Button></div>
                </div>
              </CardContent>
            </Card>
            ):( 
              <div className="text-right"><Button onClick={()=>setisOpened(true)}>Share Your Experience</Button></div>
            )
          }
        </div>

        <div className="space-y-8">
          {listExpFiltered?.map((item:any, idx:any) => 
          <InterviewListCard 
            key={idx}
            content={item.content} 
            title={item.title} 
            createdAt={item.createdAt} 
            fullname={item.userName} 
            email={item.userEmail} 
          />
          )}
        </div>
        
      </main>
    </div>
  )
}

function SearchBar({query, setQuery}: any){
  return (
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
        <input
          type="text"
          className="py-2 px-4 rounded-l-lg focus:outline-none w-full"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className="py-3 px-4 rounded-r-lg h-10"
        >
          <FiSearch />
        </div>
      </div>
  )
}

function InterviewListCard({content, createdAt, fullname, title, email }: any) {
  const [isOpened, setisOpened] = useState(false);

  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = createdAt.toLocaleDateString('en-US', options);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div>
            <div className="font-medium">{fullname} <span className=" text-muted-foreground italic">({email})</span></div>
            <div className="text-sm text-muted-foreground">
              Posted on {formattedDate?.toString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg dark:prose-invert">
          <h1 className=" text-2xl font-bold mb-3">
            {title}
          </h1>
          <p>{isOpened ? content : content?.slice(0, 200) + ` ......`}</p>
        </div>
      </CardContent>
      {isOpened ? (
        <CardFooter>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <HeartIcon className="w-4 h-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircleIcon className="w-4 h-4" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShareIcon className="w-4 h-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </CardFooter>
      ) : (
        <CardFooter>
          <Button
            onClick={() => setisOpened(true)}
            className="w-fit px-6"
            variant="outline"
          >
            Read More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InfoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ShareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
