import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Home, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  currentWorkspace?: string;
  onWorkspaceChange?: (workspace: string) => void;
}

export default function AppHeader({ currentWorkspace = "My Workspace", onWorkspaceChange }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10 gap-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <Button variant="ghost" size="icon" className="hidden sm:flex" data-testid="button-home">
          <Home className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground hidden md:inline font-medium">Tutorial</span>
      </div>

      <div className="flex items-center gap-2">
        <Select value={currentWorkspace} onValueChange={onWorkspaceChange}>
          <SelectTrigger className="w-[180px] hidden sm:flex border-border" data-testid="select-workspace">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="My Workspace">My Workspace</SelectItem>
            <SelectItem value="Team Workspace">Team Workspace</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
            3
          </Badge>
        </Button>

        <Button className="gap-2 shadow-sm" data-testid="button-get-credits">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Get Free Credits</span>
        </Button>
      </div>
    </header>
  );
}
