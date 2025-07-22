"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Users, Upload, FileText, Database, Activity, BarChart3 } from "lucide-react"
import UserCard from "@/components/UserCard";

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
      <UserCard />
    </div>
  )
}
