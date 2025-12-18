import { Calendar, DollarSign, Home, Inbox, InspectionPanel, Search, Settings, TypeIcon, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Categorias",
    url: "category-registration",
    icon: InspectionPanel,
  },
  {
    title: "Usuários",
    url: "user-registration",
    icon: User,
  },
  {
    title: "Transações",
    url: "/",
    icon: DollarSign,
  },
  {
    title: "Detalhes de Usuários",
    url: "/user-details",
    icon: User,
  },
  {
    title: "Detalhes de Categorias",
    url: "/category-details",
    icon: InspectionPanel,
  },
]

export function AppSidebar() {
  return (
    <SidebarProvider
    defaultOpen={true}
    
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
>

    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </SidebarProvider>
  )
}