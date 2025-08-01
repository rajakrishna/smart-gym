"use client";

// https://github.com/remarkjs/react-markdown - REACT MARKDOWN DOCUMENTATION

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import constants and labels
import { INITIAL_MESSAGE, SUGGESTED_PROMPTS, createMessage, type Message } from '@/constants/geminiChatbot';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

interface FloatingAIChatProps {
    children: React.ReactNode;
}

export default function FloatingAIChat({ children }: FloatingAIChatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle sending messages to the AI
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const trimmedInput = input.trim();
        setMessages(prev => [...prev, createMessage(trimmedInput, true)]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: trimmedInput }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, createMessage(data.text, false)]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, createMessage(LABELS.aiChat.errorMessage, false)]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md w-full max-w-[95vw] max-h-[90vh] min-h-[400px] h-auto p-0">
                <Card className="flex flex-col h-full border-0 max-h-[90vh]">
                    {/* Chat header with AI avatar and title */}
                    <CardHeader className="flex flex-row items-center space-y-0 pb-4 flex-shrink-0">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">{LABELS.aiChat.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{LABELS.aiChat.subtitle}</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1 p-4 pt-0 min-h-0">
                        {/* Scrollable messages area */}
                        <div className="flex-1 mb-4 overflow-y-auto overflow-x-hidden pr-2 min-h-0">
                            <div className="space-y-4">
                                {/* Render chat messages */}
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-lg px-3 py-2 ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                            }`}>
                                            {message.isUser ? (
                                                <p className="text-sm">{message.content}</p>
                                            ) : (
                                                <div className="text-sm prose prose-sm max-w-none">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                                            ul: ({ children }) => <ul className="mb-3">{children}</ul>,
                                                            ol: ({ children }) => <ol className="mb-3">{children}</ol>,
                                                        }}
                                                    >
                                                        {message.content}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Show suggested prompts when only initial message exists */}
                                {messages.length === 1 && !isLoading && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground text-center">{LABELS.aiChat.promptsHeading}</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {SUGGESTED_PROMPTS.map((prompt, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-left justify-start h-auto p-2 text-xs"
                                                    onClick={() => setInput(prompt)}
                                                >
                                                    {prompt}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Loading indicator with bouncing dots */}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg px-3 py-2">
                                            <div className="flex space-x-1">
                                                {[0, 0.1, 0.2].map((delay, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                                        style={{ animationDelay: `${delay}s` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input form with send and reset buttons */}
                        <form onSubmit={handleSubmit} className="flex space-x-2 flex-shrink-0">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={LABELS.aiChat.placeholder}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <ICONS.aiChat.send className="h-4 w-4" />
                                <span className="sr-only">{LABELS.aiChat.screenReaderLabels.sendMessage}</span>
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setMessages([{ ...INITIAL_MESSAGE, timestamp: new Date() }]);
                                    setInput('');
                                }}
                                title={LABELS.aiChat.resetTooltip}
                            >
                                <ICONS.aiChat.reset className="h-4 w-4" />
                                <span className="sr-only">{LABELS.aiChat.screenReaderLabels.resetChat}</span>
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}