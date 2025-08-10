'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import LABELS from '@/constants/labels';

export default function ConversationView() {
    const conversation = useConversation({
        onConnect: () => console.log(LABELS.pages.elevenlabs.console.connected),
        onDisconnect: () => console.log(LABELS.pages.elevenlabs.console.disconnected),
        onMessage: (message) => console.log(LABELS.pages.elevenlabs.console.message, message),
        onError: (error) => console.error(LABELS.pages.elevenlabs.console.error, error),
    });

    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });

            // Start the conversation with your agent
            await conversation.startSession({
                agentId: 'YOUR_AGENT_ID', // Replace with your agent ID
                userId: 'YOUR_CUSTOMER_USER_ID', // Optional field for tracking your end user IDs
                connectionType: 'websocket'
            });

        } catch (error) {
            console.error(LABELS.pages.elevenlabs.errors.failedToStart, error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);

    const isConnected = conversation.status === 'connected';

    return (
        <div className="container mx-auto py-10 px-4 max-w-2xl">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                        <Phone className="h-6 w-6" />
                        {LABELS.pages.elevenlabs.title}
                    </CardTitle>
                    <CardDescription>
                        {LABELS.pages.elevenlabs.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={startConversation}
                            disabled={isConnected}
                            size="lg"
                            className="flex items-center gap-2"
                        >
                            <Mic className="h-4 w-4" />
                            {LABELS.pages.elevenlabs.buttons.startConversation}
                        </Button>
                        <Button
                            onClick={stopConversation}
                            disabled={!isConnected}
                            variant="destructive"
                            size="lg"
                            className="flex items-center gap-2"
                        >
                            <PhoneOff className="h-4 w-4" />
                            {LABELS.pages.elevenlabs.buttons.endConversation}
                        </Button>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{LABELS.pages.elevenlabs.status.label}</span>
                            <Badge variant={isConnected ? "default" : "secondary"}>
                                {conversation.status}
                            </Badge>
                        </div>

                        {isConnected && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {conversation.isSpeaking ? (
                                    <>
                                        <MicOff className="h-4 w-4" />
                                        {LABELS.pages.elevenlabs.status.speaking}
                                    </>
                                ) : (
                                    <>
                                        <Mic className="h-4 w-4" />
                                        {LABELS.pages.elevenlabs.status.listening}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
