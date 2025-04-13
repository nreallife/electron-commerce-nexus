
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  ClipboardList, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, active, hasChildren, isOpen, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center justify-between px-4 py-3 rounded-md transition-colors",
      active ? "bg-shop-primary text-white" : "hover:bg-gray-100"
    )}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {hasChildren && (
      <div className="ml-2">
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
    )}
  </Link>
);

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <ShoppingBag size={18} />, label: 'Products' },
    { path: '/admin/orders', icon: <ClipboardList size={18} />, label: 'Orders' },
    { path: '/admin/customers', icon: <Users size={18} />, label: 'Customers' },
    { path: '/admin/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
    { path: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "w-64 bg-white shadow-md p-4 fixed inset-y-0 left-0 z-40 transition-transform duration-300 transform",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 py-4 px-2">
          <div className="bg-shop-primary text-white font-bold p-2 rounded">
            RBV
          </div>
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
        
        <Separator className="my-4" />
        
        {/* Navigation */}
        <nav className="space-y-1 mt-4">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </nav>
        
        <Separator className="my-4" />
        
        {/* Logout */}
        <div className="mt-auto">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => console.log('Logout')}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
