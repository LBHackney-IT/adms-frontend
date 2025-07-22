"use client"

import React from 'react';
import {useSession, signOut, signIn} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export default function UserCard() {
    const {data: session, status} = useSession()
    const user = session?.user
    console.log(session, "session")

    const onSignOut = () => {
        signOut()
    }

    if(status === "loading") return <div>Loading...</div>
    if(status === "unauthenticated") return  <div className="flex justify-center p-2 rounded-md"><Button onClick={() => signIn("github")} className="primary ">Login in</Button></div>

    return (
        <div className="border-t border-border p-2">
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/10">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image || "/placeholder.svg"} alt="user avatar" />
                        <AvatarFallback className="text-sm font-medium">{user?.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open user menu</span>
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        {/*<DropdownMenuItem>*/}
                        {/*    <Settings className="mr-2 h-4 w-4" />*/}
                        {/*    <span>Account Settings</span>*/}
                        {/*</DropdownMenuItem>*/}
                        {/*<DropdownMenuItem>*/}
                        {/*    <HelpCircle className="mr-2 h-4 w-4" />*/}
                        {/*    <span>Support</span>*/}
                        {/*</DropdownMenuItem>*/}
                        <DropdownMenuItem onClick={onSignOut} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <span>Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}