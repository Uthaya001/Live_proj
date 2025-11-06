import AppSidebar from '../AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="h-screen w-full">
        <AppSidebar onCategoryChange={(cat) => console.log('Category:', cat)} />
      </div>
    </SidebarProvider>
  );
}
