import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap,
  BadgeDollarSign,
  ClipboardList,
  Settings,
  LogOut
} from 'lucide-react';
import { User } from '../../types';
import { useAuthStore } from '../../stores/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, user }) => {
  const { logout } = useAuthStore();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Students', path: '/students', icon: <Users size={20} /> },
    { name: 'Faculty', path: '/faculty', icon: <GraduationCap size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Fees', path: '/fees', icon: <BadgeDollarSign size={20} /> },
    { name: 'Attendance', path: '/attendance', icon: <ClipboardList size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:z-0 flex flex-col h-full`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary-600" />
            <span className="text-lg font-semibold text-neutral-900">College ERP</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-neutral-500 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-neutral-900 truncate">{user.name}</p>
                <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;