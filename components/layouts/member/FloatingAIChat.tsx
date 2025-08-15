// src/components/FloatingAIChat.tsx
'use client';

// https://github.com/remarkjs/react-markdown - REACT MARKDOWN DOCUMENTATION

import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MoodAvatar from '@/components/layouts/member/moodAvatar';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import {
  SUGGESTED_PROMPTS,
  createMessage,
  type Message,
} from '@/constants/geminiChatbot';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ElevenLabsMotivation from './ElevenLabsMotivation';

interface FloatingAIChatProps {
  children: React.ReactNode;
}

export default function FloatingAIChat({ children }: FloatingAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);
  const [tab, setTab] = useState<'chat' | 'wellness'>('chat');

  // MVP hardcoded user
  const USER_ID = '1828034c-85bb-4763-a623-e67c1bedac3d';

  // Fetch initial message from server API
  const fetchInitialMessage = useCallback(async (): Promise<Message> => {
    try {
      const res = await fetch('/api/gemini/initialMessage', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch initial message');
      const json = await res.json();
      return {
        id: json.id,
        content: json.content,
        isUser: json.isUser,
        timestamp: new Date(json.timestamp),
      };
    } catch {
      return {
        id: '1',
        content:
          "Hello! I'm your fitness assistant. I can help you with workout routines, nutrition advice, exercise techniques, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
      };
    }
  }, []);

  // Load the dynamic initial message on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      const initial = await fetchInitialMessage();
      if (mounted) setMessages([initial]);
      if (mounted) setBootLoading(false);
    })();
    return () => { mounted = false; };
  }, [fetchInitialMessage]);

  const refreshInitial = useCallback(async () => {
    const initial = await fetchInitialMessage();
    setMessages([{ ...initial, timestamp: new Date() }]); // replace chat with fresh opener
  }, [fetchInitialMessage]);

  // Refresh opener when mood changes
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ userId?: string; mood?: string }>;
      if (USER_ID && ev.detail?.userId && ev.detail.userId !== USER_ID) return;
      refreshInitial();
    };
    window.addEventListener('mood:updated', handler as EventListener);
    return () => window.removeEventListener('mood:updated', handler as EventListener);
  }, [refreshInitial, USER_ID]);

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
        body: JSON.stringify({ input: trimmedInput, userId: USER_ID }),
      });

      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || 'AI error');

      setMessages(prev => [...prev, createMessage(data.text, false)]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, createMessage(LABELS.aiChat.errorMessage, false)]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset chat to a fresh initial message
  const handleReset = async () => {
    setIsLoading(true);
    const initial = await fetchInitialMessage();
    setMessages([{ ...initial, timestamp: new Date() }]);
    setInput('');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md w-full max-w-[70vw] max-h-[90vh] min-h-[400px] h-auto p-0 ">
        {/* Hidden title for a11y (prevents Radix warning) */}
        <DialogHeader>
          <VisuallyHidden asChild>
            <DialogTitle>{LABELS.aiChat.dialogAriaTitle ?? 'AI Coach chat'}</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        <div className="flex items-center space-x-3 pt-10 -mb-4 px-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="w-full">Chat</TabsTrigger>
              <TabsTrigger value="wellness" className="w-full">Wellness Check-In</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {tab === 'chat' && (
          <Card className="flex flex-col h-full border-0 max-h-[90vh]">
            {/* Chat header with AI avatar and title */}
            <CardHeader className="flex flex-row items-center space-y-0 pb-4 flex-shrink-0 justify-between">
              <div className="flex items-center space-x-3">
                {USER_ID && <MoodAvatar userId={USER_ID} size="md" refreshOn={isOpen} />}
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
                  {/* Boot loader while fetching initial message */}
                  {bootLoading && (
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

                  {/* Render chat messages */}
                  {!bootLoading && messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg px-3 py-2 ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
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
                  {!bootLoading && messages.length === 1 && !isLoading && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground text-center">
                        {LABELS.aiChat.promptsHeading}
                      </p>
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
                  onClick={handleReset}
                  title={LABELS.aiChat.resetTooltip}
                >
                  <ICONS.aiChat.reset className="h-4 w-4" />
                  <span className="sr-only">{LABELS.aiChat.screenReaderLabels.resetChat}</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {tab === 'wellness' && (
          <ElevenLabsMotivation />
        )}
      </DialogContent>
    </Dialog>
  );
}
