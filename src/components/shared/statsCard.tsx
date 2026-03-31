import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { createElement } from "react"
import { getIconComponent } from "@/lib/iconMapper"


interface statsCardProps {
    title: string
    value : string | number
    iconName : string
    description ?: string
    className ?: string
}

const StatsCard = ({ title, value, iconName, description, className }: statsCardProps) => {
  return (
    <Card className={cn("group hover:border-primary/50 transition-all duration-300 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          {createElement(getIconComponent(iconName), { className: "w-5 h-5" })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard