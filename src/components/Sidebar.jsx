import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, MessageSquare, CloudSun, AlertTriangle,
    Shield, Sprout, Plane, Clock, MapPin, Settings,
    Mic, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/chat', label: 'WeatherGPT', icon: Zap },
    { path: '/forecast', label: 'Forecast', icon: CloudSun },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: 2 },
    { path: '/disaster', label: 'Disaster Intelligence', icon: Shield },
    { path: '/agriculture', label: 'Agriculture', icon: Sprout },
    { path: '/travel', label: 'Travel Advisory', icon: Plane },
    { path: '/history', label: 'History', icon: Clock },
    { path: '/locations', label: 'Locations', icon: MapPin },
    { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }) {
    const location = useLocation();
    const [voiceActive, setVoiceActive] = useState(false);

    return (
        <>
            <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
                {/* Logo */}
                <div className="sidebar__logo">
                    <div className="sidebar__logo-mark">
                        <div className="sidebar__logo-icon">
                            <Zap size={collapsed ? 18 : 20} strokeWidth={2.5} />
                        </div>
                    </div>
                    {!collapsed && (
                        <motion.div
                            className="sidebar__logo-text"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="sidebar__brand">WeatherGPT</span>
                            <span className="sidebar__tagline">Weather Intelligence</span>
                        </motion.div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="sidebar__nav">
                    <ul className="sidebar__list">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <span className="sidebar__link-icon">
                                            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                                        </span>
                                        {!collapsed && (
                                            <motion.span
                                                className="sidebar__link-label"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                        {item.badge && !collapsed && (
                                            <span className="sidebar__badge">{item.badge}</span>
                                        )}
                                        {item.badge && collapsed && (
                                            <span className="sidebar__badge-dot" />
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Voice Assistant */}
                <div className="sidebar__footer">
                    <button
                        className={`sidebar__voice ${voiceActive ? 'sidebar__voice--active' : ''}`}
                        onClick={() => setVoiceActive(!voiceActive)}
                        title="Voice Assistant"
                        aria-label="Toggle voice assistant"
                    >
                        <Mic size={18} />
                        {!collapsed && <span>Voice Assistant</span>}
                    </button>

                    <button
                        className="sidebar__toggle"
                        onClick={onToggle}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        className="sidebar__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onToggle}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
