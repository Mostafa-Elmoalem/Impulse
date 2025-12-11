import { useState } from 'react';
import { Plus, Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';

// Mock data (will be replaced with API calls)
const mockTasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive docs for the new feature',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-12-15',
    timeBlock: { start: '09:00', end: '11:00' },
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and merge pending PRs',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-12-12',
    timeBlock: { start: '14:00', end: '15:30' },
  },
  {
    id: '3',
    title: 'Team standup meeting',
    description: 'Daily sync with the team',
    priority: 'low',
    status: 'completed',
    dueDate: '2025-12-11',
    timeBlock: { start: '10:00', end: '10:15' },
  },
];

type Priority = 'high' | 'medium' | 'low';
type Status = 'pending' | 'in-progress' | 'completed' | 'delayed';

const priorityColors: Record<Priority, string> = {
  high: 'text-danger-600 bg-danger-50 border-danger-200',
  medium: 'text-warning-600 bg-warning-50 border-warning-200',
  low: 'text-gray-600 bg-gray-50 border-gray-200',
};

const statusIcons: Record<Status, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  'in-progress': <AlertCircle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
  delayed: <AlertCircle className="h-4 w-4" />,
};

export const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Status | 'all'>('all');

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage your daily tasks and time blocks</p>
        </div>
        
        <Button leftIcon={<Plus size={20} />}>
          Add Task
        </Button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedFilter('all')}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === 'pending' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={selectedFilter === 'in-progress' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={selectedFilter === 'completed' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's Progress</CardTitle>
              <CardDescription>
                {mockTasks.filter(t => t.status === 'completed').length} of {mockTasks.length} tasks completed
              </CardDescription>
            </div>
            <span className="text-2xl font-bold text-brand-600">
              {Math.round((mockTasks.filter(t => t.status === 'completed').length / mockTasks.length) * 100)}%
            </span>
          </div>
          
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-brand transition-all duration-500 rounded-full"
              style={{ 
                width: `${(mockTasks.filter(t => t.status === 'completed').length / mockTasks.length) * 100}%` 
              }}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
              <p className="text-gray-600 mt-1">Try adjusting your search or filters</p>
            </div>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              hoverable
              className={task.status === 'completed' ? 'opacity-60' : ''}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  className={`
                    mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition-all
                    ${task.status === 'completed' 
                      ? 'bg-success-500 border-success-500' 
                      : 'border-gray-300 hover:border-brand-500'
                    }
                  `}
                >
                  {task.status === 'completed' && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through' : ''}`}>
                        {task.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        {/* Time Block */}
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock size={16} />
                          <span>{task.timeBlock.start} - {task.timeBlock.end}</span>
                        </div>
                        
                        {/* Priority Badge */}
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${priorityColors[task.priority as Priority]}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        
                        {/* Status Badge */}
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          {statusIcons[task.status as Status]}
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};