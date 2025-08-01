"use client";

// https://aiprojectlabs.com/blog/next-gemini-api - this is the source of this file

import { FormEvent, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}


export default function Home() {
    const [response, setResponse] = useState<string>('');

    async function getBob(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const input = formData.get('input')?.toString() ?? '';
        const response = await fetch('/api/gemini/example', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });

        const data = await response.json();
        return setResponse(data.text);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Meet Sad Bob</CardTitle>
                    <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src="/images/sad-bob.webp" alt="Freakbob" />
                        <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent>
                    <form onSubmit={getBob} className="space-y-4">
                        <Label className='text-lg font-bold mb-4' htmlFor="theme">Ask Sad Bob how he feels... 😊</Label>
                        <Input type="text" id="input" name="input" placeholder="Enter something..." className="w-full resize-none" style={{ minHeight: 'auto', height: 'auto' }} />
                        <Button type="submit" className="w-full">Generate</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="whitespace-pre-wrap break-words text-sm max-w-full overflow-hidden">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {response || "SadBob's response will appear here."}
                        </ReactMarkdown>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}