
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/authSlice';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-todo-light flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 animate-fade-in">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-todo-dark">
              TaskFlow
            </span>
          </div>
          
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-9 w-9 button-animation" aria-label="User menu">
                  <Avatar className="h-9 w-9 border-2 border-todo-blue">
                    <AvatarFallback className="bg-todo-blue text-white">
                      {user ? getInitials(user) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex-col items-start">
                  <div className="font-medium mb-1">
                    {user}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Signed in
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>TaskFlow © {new Date().getFullYear()} • Inspired by Apple design</p>
      </footer>
    </div>
  );
};

export default Layout;
