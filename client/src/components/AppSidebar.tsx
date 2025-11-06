import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Inbox,
  Send,
  Archive,
  Trash2,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Coffee,
  UserX,
  Clock,
  Settings,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryItem {
  title: string;
  icon: typeof Inbox;
  count?: number;
  color?: string;
}

interface AppSidebarProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function AppSidebar({ activeCategory = "Lead", onCategoryChange }: AppSidebarProps) {
  const folders: CategoryItem[] = [
    { title: "All Inboxes", icon: Inbox, count: 42 },
    { title: "Sent", icon: Send },
    { title: "Archive", icon: Archive },
    { title: "Trash", icon: Trash2 },
  ];

  const categories: CategoryItem[] = [
    { title: "Lead", icon: Users, count: 15, color: "bg-blue-500" },
    { title: "Interested", icon: CheckCircle2, count: 8, color: "bg-green-500" },
    { title: "Meeting Booked", icon: Calendar, count: 5, color: "bg-blue-600" },
    { title: "Meeting Completed", icon: CheckCircle2, count: 12, color: "bg-gray-500" },
    { title: "Closed", icon: Archive, count: 23, color: "bg-gray-600" },
    { title: "Out of office", icon: Coffee, count: 3, color: "bg-orange-500" },
    { title: "Wrong person", icon: UserX, count: 2, color: "bg-red-500" },
    { title: "Not interested", icon: XCircle, count: 7, color: "bg-gray-400" },
  ];

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">ReachInbox</h2>
            <p className="text-xs text-muted-foreground font-medium">AI Email Manager</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onCategoryChange?.(item.title)}
                    isActive={activeCategory === item.title}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.count !== undefined && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs px-2"
                        data-testid={`count-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <span>Filters</span>
              <div className="h-4 w-4 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">AI</span>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onCategoryChange?.(item.title)}
                    isActive={activeCategory === item.title}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.color && <div className={`h-2 w-2 rounded-full ${item.color}`} />}
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.count !== undefined && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs px-2"
                        data-testid={`count-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton data-testid="link-settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
