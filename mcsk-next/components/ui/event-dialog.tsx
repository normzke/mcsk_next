'use client'

import * as React from "react"
import { format } from "date-fns"
import { CalendarDays, MapPin, Clock, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Event } from "./calendar"
import { sendEmail, TEMPLATE_IDS } from "@/lib/email-service"

interface EventDialogProps {
  event: Event | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDialog({ event, open, onOpenChange }: EventDialogProps) {
  const [isRegistering, setIsRegistering] = React.useState(false)
  const { toast } = useToast()

  if (!event) return null

  const handleRegister = async () => {
    setIsRegistering(true)
    try {
      // Send registration email
      await sendEmail(TEMPLATE_IDS.EVENT_REGISTRATION, {
        event_title: event.title,
        event_date: format(event.start, "PPP"),
        event_time: format(event.start, "p"),
        event_location: event.location || "TBA",
      })

      toast({
        title: "Registration Successful",
        description: "You will receive a confirmation email shortly.",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  const getCategoryColor = (category: Event["category"]) => {
    switch (category) {
      case "workshop":
        return "bg-emerald-100 text-emerald-800"
      case "meeting":
        return "bg-indigo-100 text-indigo-800"
      case "concert":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <Badge
              className={`${getCategoryColor(event.category)} capitalize mt-2`}
              variant="secondary"
            >
              {event.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center text-slate-600">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>{format(event.start, "PPP")}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <Clock className="mr-2 h-4 w-4" />
            <span>
              {format(event.start, "p")} - {format(event.end, "p")}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center text-slate-600">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
          {event.description && (
            <div className="pt-4 text-slate-600">
              <p>{event.description}</p>
            </div>
          )}
          <div className="pt-4">
            <Button
              className="w-full"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Users className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register for Event"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 