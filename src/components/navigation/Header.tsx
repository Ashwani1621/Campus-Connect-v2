import { FC } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  user: User | null;
}

const Header: FC<HeaderProps> = ({ title, onMenuClick, user }) => {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left side: Menu button (mobile) and Title */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="mr-4 text-neutral-500 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
        </div>

        {/* Right side: Search and user actions */}
        <div className="flex items-center space-x-4">
          {/* Search bar (hidden on mobile) */}
          <div className="hidden md:flex items-center relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative text-neutral-500 hover:text-neutral-700">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                {user?.name.charAt(0) || 'U'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;