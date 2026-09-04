import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Star, Bell, BellOff, MoreVertical, Plus } from 'lucide-react';
import { savedLocations } from '../data/weatherData';
import './Locations.css';

export default function Locations() {
    const [locations, setLocations] = useState(savedLocations);
    const [search, setSearch] = useState('');

    const toggleAlerts = (id) => {
        setLocations(locs => locs.map(l => l.id === id ? { ...l, alerts: !l.alerts } : l));
    };

    const setDefault = (id) => {
        setLocations(locs => locs.map(l => ({ ...l, isDefault: l.id === id })));
    };

    return (
        <motion.div className="locations-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="locations-page__header">
                <span className="label">Monitored Areas</span>
                <h2 className="locations-page__title">Locations</h2>
                <p className="locations-page__desc">Manage your saved cities and alert preferences.</p>
            </div>

            <div className="locations-search-bar">
                <div className="locations-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search to add new location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="locations-add-btn">
                    <Plus size={16} /> Add
                </button>
            </div>

            <div className="locations-list">
                {locations.map((loc, i) => (
                    <motion.div
                        className={`location-card ${loc.isDefault ? 'location-card--default' : ''}`}
                        key={loc.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="location-card__info">
                            <div className="location-card__name-row">
                                <MapPin size={16} className={loc.isDefault ? 'text-accent' : 'text-tertiary'} />
                                <h3 className="location-card__name">{loc.name}</h3>
                                {loc.isDefault && <span className="location-card__badge">Default</span>}
                            </div>
                            <p className="location-card__region">{loc.region}</p>
                            <div className="location-card__coords mono">
                                {loc.lat}°, {loc.lon}°
                            </div>
                        </div>

                        <div className="location-card__actions">
                            <button
                                className={`location-card__alert-btn ${loc.alerts ? 'active' : ''}`}
                                onClick={() => toggleAlerts(loc.id)}
                                title={loc.alerts ? "Disable Alerts" : "Enable Alerts"}
                            >
                                {loc.alerts ? <Bell size={16} /> : <BellOff size={16} />}
                            </button>
                            {!loc.isDefault && (
                                <button
                                    className="location-card__default-btn"
                                    onClick={() => setDefault(loc.id)}
                                    title="Set as Default"
                                >
                                    <Star size={16} />
                                </button>
                            )}
                            <button className="location-card__menu-btn">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
