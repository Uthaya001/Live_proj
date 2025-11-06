import AppHeader from '../AppHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppHeaderExample() {
  return (
    <SidebarProvider>
      <div className="w-full">
        <AppHeader onWorkspaceChange={(ws) => console.log('Workspace:', ws)} />
      </div>
    </SidebarProvider>
  );
}
