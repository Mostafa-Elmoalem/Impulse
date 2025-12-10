import { NavLink } from 'react-router-dom';
import { FaTasks, FaChartPie, FaCheck, FaTrash, FaClock, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  // هذه أرقام مؤقتة سنربطها بالـ Store لاحقاً
  const stats = {
    done: 12,
    deleted: 3,
    delayed: 2
  };

  return (
    <aside className="sidebar">
      {/* 1. الشعار */}
      <div className="logo-container">
        <h1>IMPULSE</h1>
      </div>

      {/* 2. القائمة الرئيسية */}
      <nav className="nav-menu">
        <NavLink to="/overview" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaChartPie className="icon" />
          <span>Overview</span>
        </NavLink>
        
        <NavLink to="/todo" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaTasks className="icon" />
          <span>To-Do List</span>
        </NavLink>
      </nav>

      <div className="divider"></div>

      {/* 3. ملخص المهام (Stats) */}
      <div className="stats-container">
        <h3>Tasks Summary</h3>
        
        <div className="stat-item done">
          <div className="stat-label">
            <FaCheck /> <span>Done</span>
          </div>
          <span className="stat-count">{stats.done}</span>
        </div>

        <div className="stat-item deleted">
          <div className="stat-label">
            <FaTrash /> <span>Deleted</span>
          </div>
          <span className="stat-count">{stats.deleted}</span>
        </div>

        <div className="stat-item delayed">
          <div className="stat-label">
            <FaClock /> <span>Delayed</span>
          </div>
          <span className="stat-count">{stats.delayed}</span>
        </div>
      </div>

      {/* 4. الإعدادات (في الأسفل) */}
      <div className="bottom-menu">
        <button className="nav-item">
          <FaCog className="icon" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;