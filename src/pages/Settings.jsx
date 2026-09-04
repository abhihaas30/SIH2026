import { motion } from 'framer-motion';
import { Globe, Bell, Mic, Database, Shield, Monitor, Smartphone, Moon } from 'lucide-react';
import './Settings.css';

const settingsSections = [
    {
        title: 'Preferences',
        items: [
            { id: 'theme', icon: Moon, label: 'Theme', type: 'select', value: 'System', options: ['Light', 'Dark', 'System'] },
            { id: 'units', icon: Thermometer, label: 'Temperature Units', type: 'select', value: 'Celsius', options: ['Celsius', 'Fahrenheit'] },
            { id: 'lang', icon: Globe, label: 'Language', type: 'select', value: 'English', options: ['English', 'Hindi', 'Telugu'] },
        ]
    },
    {
        title: 'Intelligence & Voice',
        items: [
            { id: 'voice', icon: Mic, label: 'Voice Assistant', type: 'toggle', value: true },
            { id: 'voice-lang', icon: Globe, label: 'Spoken Language', type: 'select', value: 'English (India)', options: ['English (US)', 'English (UK)', 'English (India)', 'Hindi'] },
            { id: 'verbose', icon: Monitor, label: 'Verbose Explanations', type: 'toggle', value: true },
        ]
    },
    {
        title: 'Notifications & Alerts',
        items: [
            { id: 'push', icon: Bell, label: 'Push Notifications', type: 'toggle', value: true },
            { id: 'sms', icon: Smartphone, label: 'SMS Alerts (Critical Only)', type: 'toggle', value: false },
            { id: 'sources', icon: Database, label: 'Data Sources Display', type: 'toggle', value: true },
            { id: 'privacy', icon: Shield, label: 'Location Tracking', type: 'select', value: 'While Using', options: ['Always', 'While Using', 'Never'] },
        ]
    }
];

function Thermometer({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /><path d="M11.5 6v6" />
        </svg>
    );
}

export default function Settings() {
    return (
        <motion.div className="settings-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="settings-page__header">
                <span className="label">Configuration</span>
                <h2 className="settings-page__title">Settings</h2>
                <p className="settings-page__desc">Personalize your WeatherGPT experience.</p>
            </div>

            <div className="settings-content">
                {settingsSections.map((section, idx) => (
                    <motion.div
                        className="settings-section"
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h3 className="settings-section__title">{section.title}</h3>
                        <div className="settings-group">
                            {section.items.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div className="settings-item" key={i}>
                                        <div className="settings-item__left">
                                            <Icon size={18} className="settings-item__icon" />
                                            <span className="settings-item__label">{item.label}</span>
                                        </div>
                                        <div className="settings-item__right">
                                            {item.type === 'toggle' ? (
                                                <div className={`settings-toggle ${item.value ? 'settings-toggle--on' : ''}`}>
                                                    <div className="settings-toggle__handle" />
                                                </div>
                                            ) : (
                                                <select className="settings-select" defaultValue={item.value}>
                                                    {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
