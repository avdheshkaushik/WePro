import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  Bell,
  User
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '#', icon: Home, current: true },
    { name: 'Projects', href: '#', icon: Calendar, current: false },
    { name: 'Team', href: '#', icon: Users, current: false },
    { name: 'Settings', href: '#', icon: Settings, current: false },
  ];

  const stats = [
    { name: 'Active Projects', value: '12', change: '+2.5%', changeType: 'positive' },
    { name: 'Team Members', value: '24', change: '+1.2%', changeType: 'positive' },
    { name: 'Tasks Completed', value: '89', change: '+12.3%', changeType: 'positive' },
    { name: 'Hours Saved', value: '156', change: '+8.1%', changeType: 'positive' },
  ];

  const recentProjects = [
    { id: 1, name: 'Website Redesign', progress: 75, status: 'In Progress' },
    { id: 2, name: 'Mobile App Development', progress: 45, status: 'In Progress' },
    { id: 3, name: 'Marketing Campaign', progress: 90, status: 'Almost Done' },
    { id: 4, name: 'Product Launch', progress: 30, status: 'Planning' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-primary-600">WePro</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-2xl font-bold text-primary-600">WePro</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={logout}
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center gap-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </span>
                <User className="h-8 w-8 rounded-full bg-gray-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Welcome back! Here's what's happening with your projects today.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="card">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Projects */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
                <button className="btn-primary flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.status}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 w-32">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 