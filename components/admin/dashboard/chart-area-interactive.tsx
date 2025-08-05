"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", memberVisits: 222 },
  { date: "2024-04-02", memberVisits: 97 },
  { date: "2024-04-03", memberVisits: 167 },
  { date: "2024-04-04", memberVisits: 242 },
  { date: "2024-04-05", memberVisits: 373 },
  { date: "2024-04-06", memberVisits: 301 },
  { date: "2024-04-07", memberVisits: 245 },
  { date: "2024-04-08", memberVisits: 409 },
  { date: "2024-04-09", memberVisits: 59 },
  { date: "2024-04-10", memberVisits: 261 },
  { date: "2024-04-11", memberVisits: 327 },
  { date: "2024-04-12", memberVisits: 292 },
  { date: "2024-04-13", memberVisits: 342 },
  { date: "2024-04-14", memberVisits: 137 },
  { date: "2024-04-15", memberVisits: 120 },
  { date: "2024-04-16", memberVisits: 138 },
  { date: "2024-04-17", memberVisits: 446 },
  { date: "2024-04-18", memberVisits: 364 },
  { date: "2024-04-19", memberVisits: 243 },
  { date: "2024-04-20", memberVisits: 89 },
  { date: "2024-04-21", memberVisits: 137 },
  { date: "2024-04-22", memberVisits: 224 },
  { date: "2024-04-23", memberVisits: 138 },
  { date: "2024-04-24", memberVisits: 387 },
  { date: "2024-04-25", memberVisits: 215 },
  { date: "2024-04-26", memberVisits: 75 },
  { date: "2024-04-27", memberVisits: 383 },
  { date: "2024-04-28", memberVisits: 122 },
  { date: "2024-04-29", memberVisits: 315 },
  { date: "2024-04-30", memberVisits: 454 },
  { date: "2024-05-01", memberVisits: 165 },
  { date: "2024-05-02", memberVisits: 293 },
  { date: "2024-05-03", memberVisits: 247 },
  { date: "2024-05-04", memberVisits: 385 },
  { date: "2024-05-05", memberVisits: 481 },
  { date: "2024-05-06", memberVisits: 498 },
  { date: "2024-05-07", memberVisits: 388 },
  { date: "2024-05-08", memberVisits: 149 },
  { date: "2024-05-09", memberVisits: 227 },
  { date: "2024-05-10", memberVisits: 293 },
  { date: "2024-05-11", memberVisits: 335 },
  { date: "2024-05-12", memberVisits: 197 },
  { date: "2024-05-13", memberVisits: 197 },
  { date: "2024-05-14", memberVisits: 448 },
  { date: "2024-05-15", memberVisits: 473 },
  { date: "2024-05-16", memberVisits: 338 },
  { date: "2024-05-17", memberVisits: 499 },
  { date: "2024-05-18", memberVisits: 315 },
  { date: "2024-05-19", memberVisits: 235 },
  { date: "2024-05-20", memberVisits: 177 },
  { date: "2024-05-21", memberVisits: 82 },
  { date: "2024-05-22", memberVisits: 81 },
  { date: "2024-05-23", memberVisits: 252 },
  { date: "2024-05-24", memberVisits: 294 },
  { date: "2024-05-25", memberVisits: 201 },
  { date: "2024-05-26", memberVisits: 213 },
  { date: "2024-05-27", memberVisits: 420 },
  { date: "2024-05-28", memberVisits: 233 },
  { date: "2024-05-29", memberVisits: 78 },
  { date: "2024-05-30", memberVisits: 340 },
  { date: "2024-05-31", memberVisits: 178 },
  { date: "2024-06-01", memberVisits: 178 },
  { date: "2024-06-02", memberVisits: 470 },
  { date: "2024-06-03", memberVisits: 103 },
  { date: "2024-06-04", memberVisits: 439 },
  { date: "2024-06-05", memberVisits: 88 },
  { date: "2024-06-06", memberVisits: 294 },
  { date: "2024-06-07", memberVisits: 323 },
  { date: "2024-06-08", memberVisits: 385 },
  { date: "2024-06-09", memberVisits: 438 },
  { date: "2024-06-10", memberVisits: 155 },
  { date: "2024-06-11", memberVisits: 92 },
  { date: "2024-06-12", memberVisits: 492 },
  { date: "2024-06-13", memberVisits: 81 },
  { date: "2024-06-14", memberVisits: 426 },
  { date: "2024-06-15", memberVisits: 307 },
  { date: "2024-06-16", memberVisits: 371 },
  { date: "2024-06-17", memberVisits: 475 },
  { date: "2024-06-18", memberVisits: 107 },
  { date: "2024-06-19", memberVisits: 341 },
  { date: "2024-06-20", memberVisits: 408 },
  { date: "2024-06-21", memberVisits: 169 },
  { date: "2024-06-22", memberVisits: 317 },
  { date: "2024-06-23", memberVisits: 480 },
  { date: "2024-06-24", memberVisits: 132 },
  { date: "2024-06-25", memberVisits: 141 },
  { date: "2024-06-26", memberVisits: 434 },
  { date: "2024-06-27", memberVisits: 448 },
  { date: "2024-06-28", memberVisits: 149 },
  { date: "2024-06-29", memberVisits: 103 },
  { date: "2024-06-30", memberVisits: 446 },
]

const chartConfig = {
  memberVisits: {
    label: "Visitors",
    color: "hsl(221, 83%, 53%)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMemberVisits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-memberVisits)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-memberVisits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="memberVisits"
              type="natural"
              fill="url(#fillMemberVisits)"
              stroke="var(--color-memberVisits)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
