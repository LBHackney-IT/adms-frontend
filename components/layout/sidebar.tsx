"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Users, Upload, FileText, Database, Activity, BarChart3, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Apprentices", href: "/apprentices", icon: Users },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Apprentice Data Import", href: "/apprentice-data-ingestion", icon: Upload },
  { name: "Transaction Data Import", href: "/transaction-data-ingestion", icon: Database },
  { name: "Activity Logs", href: "/logs", icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-muted/50 border-r border-border">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-[#00b341]/20 text-[#000]" : "text-foreground/70 hover:bg-[#00b341]/10 hover:text-primary",
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-[#00b341]" : "text-muted-foreground group-hover:text-foreground/80",
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-2">
        <Separator className="my-2" />
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/10">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john.doe@hackney.gov.uk</p>
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
