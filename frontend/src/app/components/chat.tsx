'use client';

import { Input } from ".././components/ui/input"
import { Button } from ".././components/ui/button"
import { useChat } from "ai/react"
import React, { useRef, useEffect } from 'react'
import { useTheme } from "next-themes";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";


export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const chatParent = useRef<HTMLUListElement>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const domNode = chatParent.current
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight
        }
    })

    return (
        <main className="flex flex-col items-center">
            <div className="max-w-3xl flex flex-col w-full h-screen max-h-dvh justify-center">
                <header className="p-4 w-full mx-auto">
                    <h1 className="text-2xl font-bold">Uni Ai Helper</h1>
                </header>
                <div className="flex flex-col flex-grow justify-center gap-4 bg-base border border-x-gray-300 shadow-lg p-4 rounded-md">
                    <section className="p-4 w-full flex justify-center">
                        <form onSubmit={handleSubmit} className="flex w-full gap-3">
                            <input type="text" className="input input-bordered w-full border-primary" placeholder="Ask me something..." value={input} onChange={handleInputChange} />
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </form>
                    </section>

                    <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3x">
                        <ul ref={chatParent} className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4">
                            {messages.map((m, index) => (
                                <React.Fragment key={index}>
                                    {m.role === 'user' ? (
                                        <li key={index} className="flex flex-row">
                                            <div className="chat chat-start">
                                                <div className="chat-bubble">
                                                    <ReactMarkdown className="text-pretty" remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                                                </div>
                                            </div>
                                        </li>
                                    ) : (
                                        <li key={index} className="flex flex-row-reverse">
                                            <div className="chat chat-end">
                                                <div className="chat-bubble chat-bubble-info bg-neutral-content">
                                                    <span className="font-bold">Answer: </span>
                                                    <ReactMarkdown
                                                        className="text-pretty"
                                                        remarkPlugins={[remarkGfm]}
                                                    >
                                                        {m.content}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul >
                    </section>
                </div>
            </div>
        </main>
    )
}