"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Badge, Bell, Calendar, CheckCircle, Clock, UserPlus } from "lucide-react";
import { useState } from "react";



interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "schedule" | "system" | "user";
  timestamp: Date;
  read: boolean;
}

const MOCK_NOTIFICATION: Notification[] = [
  {
    id: "1",
    title: "New Appointment Booked",
    message: "A new appointment has been scheduled with Dr. Ahmed for tomorrow at 10:30 AM.",
    type: "appointment",
    timestamp: new Date("2026-03-06T10:30:00"),
    read: false,
  },
  {
    id: "2",
    title: "Schedule Updated",
    message: "Your schedule has been updated for the upcoming week.",
    type: "schedule",
    timestamp: new Date("2026-03-05T14:00:00"),
    read: true,
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "The system will undergo maintenance tonight from 12:00 AM to 2:00 AM.",
    type: "system",
    timestamp: new Date("2026-03-04T18:00:00"),
    read: false,
  },
  {
    id: "4",
    title: "New User Registered",
    message: "A new patient has registered on the platform.",
    type: "user",
    timestamp: new Date("2026-03-03T09:15:00"),
    read: true,
  },
  {
    id: "5",
    title: "Appointment Reminder",
    message: "Reminder: You have an appointment with Dr. Rahman today at 4:00 PM.",
    type: "appointment",
    timestamp: new Date("2026-03-07T15:00:00"),
    read: false,
  },
];

const getNotificationIcon = (type : Notification["type"]) => {
    switch(type){
        case "appointment":
            return <Calendar className="h-4 w-4 text-blue-600"/>
        case "schedule":
            return <Clock className="h-4 w-4 text-amber-600"/>
        case "system":
            return <CheckCircle className="h-4 w-4 text-purple-600"/>
        case "user":
            return <UserPlus className="h-4 w-4 text-green-600"/>
        default:
            return <Bell className="h-4 w-4 text-gray-600"/>
    }
}


const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATION);
    
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground border-2 border-background">
                            <span className="text-sm font-bold">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 pb-2">
                    <DropdownMenuLabel className="p-0 font-semibold">
                        Notifications
                    </DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <Button 
                            variant="ghost" 
                            className="h-auto p-0 text-xs text-primary hover:bg-transparent"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                
                <DropdownMenuSeparator />

                <ScrollArea className="h-[350px]">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <DropdownMenuItem 
                                key={notification.id}
                                className={`flex flex-col items-start gap-1 p-4 cursor-pointer focus:bg-accent ${!notification.read ? "bg-muted/40" : ""}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex w-full items-start gap-3">
                                    <div className="mt-1">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm font-medium leading-none ${!notification.read ? "font-bold" : ""}`}>
                                                {notification.title}
                                            </p>
                                            {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-blue-600" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            No notifications yet.
                        </div>
                    )}
                </ScrollArea>
                
                <DropdownMenuSeparator />
                
                <div className="p-2">
                    <Button variant="ghost" className="w-full text-xs h-8">
                        View all notifications
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default NotificationDropdown;