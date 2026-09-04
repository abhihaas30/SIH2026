import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Globe, ChevronDown, Search } from 'lucide-react';
import './Header.css';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
];

const pageTitles = {
    '/': 'Dashboard',
    '/chat': 'WeatherGPT',
    '/forecast': 'Forecast',
    '/alerts': 'Alerts',
    '/disaster': 'Disaster Intelligence',
    '/agriculture': 'Agriculture',
    '/travel': 'Travel Advisory',
    '/history': 'History',
    '/locations': 'Locations',
    '/settings': 'Settings',
};

export default function Header({ onMenuClick }) {
    const location = useLocation();
    const [lang, setLang] = useState('en');
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const currentLang = languages.find(l => l.code === lang);

    return (
        <header className="header">
            <div className="header__left">
                <button className="header__menu" onClick={onMenuClick} aria-label="Toggle menu">
                    <Menu size={20} />
                </button>
                <div className="header__title-wrap">
                    <h1 className="header__title">{pageTitles[location.pathname] || 'WeatherGPT'}</h1>
                    <span className="header__timestamp mono">Updated 2 min ago</span>
                </div>
            </div>

            <div className="header__right">
                <div className="header__search">
                    <Search size={15} className="header__search-icon" />
                    <input
                        type="text"
                        placeholder="Search locations, forecasts..."
                        className="header__search-input"
                        aria-label="Search"
                    />
                    <kbd className="header__kbd">⌘K</kbd>
                </div>

                <div className="header__lang" ref={langRef}>
                    <button
                        className="header__lang-trigger"
                        onClick={() => setLangOpen(!langOpen)}
                        aria-label="Select language"
                    >
                        <Globe size={15} />
                        <span>{currentLang.label}</span>
                        <ChevronDown size={13} className={`header__lang-chevron ${langOpen ? 'header__lang-chevron--open' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {langOpen && (
                            <motion.div
                                className="header__lang-dropdown"
                                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                transition={{ duration: 0.15 }}
                            >
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        className={`header__lang-option ${l.code === lang ? 'header__lang-option--active' : ''}`}
                                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
