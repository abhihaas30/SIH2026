import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => {
            const mobile = window.innerWidth <= 1024;
            setIsMobile(mobile);
            if (mobile) setSidebarCollapsed(true);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleToggle = () => setSidebarCollapsed(prev => !prev);

    return (
        <div className="layout">
            <Sidebar collapsed={sidebarCollapsed} onToggle={handleToggle} />
            <div
                className="layout__main"
                style={{
                    marginLeft: isMobile ? 0 : (sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)'),
                }}
            >
                <Header onMenuClick={handleToggle} />
                <main className="layout__content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
