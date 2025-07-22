import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, AlertCircle, CheckCircle, Clock, FileText, Upload, Activity } from "lucide-react"
import LoginBtn from "@/components/LoginBtn";
import SignIn from "@/components/Signin";

async function getDashboardStats() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Active Apprenticeships",
      value: "892",
      change: "+8%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "-5%",
      changeType: "negative" as const,
      icon: Clock,
    },
    {
      title: "Completed This Month",
      value: "45",
      change: "+15%",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
  ]
}

async function getRecentActivities() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    {
      id: 1,
      type: "Data Import",
      description: "CSV file imported successfully - 156 records",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "Student Update",
      description: "John Smith - Status changed to Completed",
      timestamp: "4 hours ago",
      status: "info",
    },
    {
      id: 3,
      type: "System Alert",
      description: "Google Sheets sync failed - retrying",
      timestamp: "warning",
      status: "warning",
    },
    {
      id: 4,
      type: "Report Generated",
      description: "Monthly apprenticeship report created",
      timestamp: "1 day ago",
      status: "success",
    },
  ]
}

export default async function Dashboard() {
  const stats = await getDashboardStats()
  const recentActivities = await getRecentActivities()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to the Apprenticeship Data Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV Data
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              View System Logs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {activity.status === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                    {activity.status === "info" && <Activity className="h-5 w-5 text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
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
