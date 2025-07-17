'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

type MonthlyData = {
  name: string
  total: number
}

export function Overview() {
  const [data, setData] = useState<MonthlyData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await fetch('/api/admin/dashboard/revenue')
        
        if (!response.ok) {
          throw new Error('Failed to fetch revenue data')
        }
        
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        console.error('Error fetching revenue data:', err)
        setError('Could not load revenue data')
        // Fallback to sample data if API fails
        setData([
          { name: "Jan", total: 1200 },
          { name: "Feb", total: 1800 },
          { name: "Mar", total: 2200 },
          { name: "Apr", total: 2600 },
          { name: "May", total: 3200 },
          { name: "Jun", total: 3800 },
          { name: "Jul", total: 4200 },
          { name: "Aug", total: 4600 },
          { name: "Sep", total: 4200 },
          { name: "Oct", total: 4800 },
          { name: "Nov", total: 5400 },
          { name: "Dec", total: 5800 },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchRevenueData()
  }, [])
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `KES ${value}`}
        />
        <Tooltip 
          formatter={(value) => [`KES ${value}`, 'Revenue']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar
          dataKey="total"
          fill="#0369a1"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
