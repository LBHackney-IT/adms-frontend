import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Building,
  Calendar,
  Download,
  Filter,
} from "lucide-react"

async function getAnalyticsData() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100))
  return {
    keyMetrics: [
      {
        title: "Total Apprentices",
        value: "1,247",
        change: "+12%",
        changeType: "positive" as const,
        icon: Users,
        description: "Active apprentices across all programs",
      },
      {
        title: "Completion Rate",
        value: "87%",
        change: "+5%",
        changeType: "positive" as const,
        icon: GraduationCap,
        description: "Apprentices completing their programs",
      },
      {
        title: "Total Investment",
        value: "£2.4M",
        change: "+18%",
        changeType: "positive" as const,
        icon: TrendingUp,
        description: "Total apprenticeship investment this year",
      },
      {
        title: "Average Duration",
        value: "18 months",
        change: "-2%",
        changeType: "negative" as const,
        icon: Calendar,
        description: "Average program completion time",
      },
    ],
    departmentStats: [
      { name: "IT & Digital", apprentices: 342, completion: 92, investment: 680000 },
      { name: "Finance", apprentices: 156, completion: 89, investment: 312000 },
      { name: "Human Resources", apprentices: 98, completion: 85, investment: 196000 },
      { name: "Housing", apprentices: 234, completion: 83, investment: 468000 },
      { name: "Planning", apprentices: 187, completion: 88, investment: 374000 },
      { name: "Education", apprentices: 230, completion: 90, investment: 460000 },
    ],
    programStats: [
      { name: "Software Development", level: "Level 4", apprentices: 145, avgCost: 15000, status: "High Demand" },
      { name: "Accounting", level: "Level 3", apprentices: 89, avgCost: 12000, status: "Stable" },
      { name: "HR Support", level: "Level 3", apprentices: 67, avgCost: 10000, status: "Growing" },
      { name: "Housing Management", level: "Level 4", apprentices: 78, avgCost: 14000, status: "Stable" },
      { name: "Digital Marketing", level: "Level 3", apprentices: 56, avgCost: 11000, status: "New" },
      { name: "Project Management", level: "Level 4", apprentices: 43, avgCost: 16000, status: "High Demand" },
    ],
  }
}

export default async function AnalyticsPage() {
  const { keyMetrics, departmentStats, programStats } = await getAnalyticsData()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "High Demand":
        return "bg-red-100 text-red-800"
      case "Growing":
        return "bg-teal-100 text-teal-800"
      case "New":
        return "bg-sky-100 text-sky-800"
      case "Stable":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics for apprenticeship programs and performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Data
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {metric.changeType === "positive" ? (
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="inline h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Department Performance
            </CardTitle>
            <CardDescription>Apprentice distribution and completion rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{dept.apprentices} apprentices</span>
                      <span className="text-xs font-medium">{dept.completion}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={dept.completion} className="flex-1" />
                    <span className="text-xs text-muted-foreground min-w-0">{formatCurrency(dept.investment)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Program Analysis
            </CardTitle>
            <CardDescription>Popular programs and their performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programStats.map((program) => (
                <div key={program.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{program.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {program.level}
                      </Badge>
                      <Badge className={getStatusColor(program.status)} variant="outline">
                        {program.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>{program.apprentices} apprentices</span>
                      <span>Avg: {formatCurrency(program.avgCost)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
