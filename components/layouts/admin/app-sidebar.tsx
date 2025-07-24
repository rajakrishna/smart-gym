"use client"

import * as React from "react"

import LABELS from "@/constants/labels"
import ICONS from "@/constants/icons"

// import { NavDocuments } from "@/components/layouts/admin/nav-documents"
import { NavMain } from "@/components/layouts/admin/nav-main"
// import { NavSecondary } from "@/components/layouts/admin/nav-secondary"
import { NavUser } from "@/components/layouts/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: LABELS.admin.navigation.dashboard,
      url: "/admin/dashboard",
      icon: ICONS.admin.dashboard,
    },
    {
      title: LABELS.admin.navigation.messages,
      url: "/admin/messages",
      icon: ICONS.admin.messages,
    },
    {
      title: LABELS.admin.navigation.analytics,
      url: "/admin/analytics",
      icon: ICONS.admin.analytics,
    },
    {
      title: LABELS.admin.navigation.classSchedules,
      url: "/admin/class-schedules",
      icon: ICONS.admin.classSchedules,
    },
    {
      title: LABELS.admin.navigation.members,
      url: "/admin/members",
      icon: ICONS.admin.members,
    },
    {
      title: LABELS.admin.navigation.cafe,
      url: "/admin/cafe",
      icon: ICONS.admin.cafe,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-2 justify-center">
                <ICONS.admin.branding className="!size-5" />
                <span className="text-base font-semibold">{LABELS.app.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuSubItem>
            <NavUser user={data.user} />
          </SidebarMenuSubItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>

      </SidebarFooter> */}
    </Sidebar>
  )
}
