import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Car, Train, MapPin, Calendar, Shield, Clock, Umbrella, ArrowRight, CloudRain, Wind, Eye, Zap } from 'lucide-react';
import './Travel.css';

const travelModes = [
    { id: 'car', label: 'Road', icon: Car },
    { id: 'train', label: 'Rail', icon: Train },
    { id: 'flight', label: 'Flight', icon: Plane },
];

export default function Travel() {
    const [destination, setDestination] = useState('Visakhapatnam');
    const [date, setDate] = useState('2026-09-05');
    const [mode, setMode] = useState('car');
    const [searched, setSearched] = useState(true);

    return (
        <motion.div className="travel-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="travel-page__header">
                <span className="label">Journey Planning</span>
                <h2 className="travel-page__title">Travel Advisory</h2>
                <p className="travel-page__desc">Weather-informed travel intelligence for safer, smarter journeys.</p>
            </div>

            {/* Search Form */}
            <div className="travel-form">
                <div className="travel-form__field">
                    <label className="travel-form__label">Destination</label>
                    <div className="travel-form__input-wrap">
                        <MapPin size={15} />
                        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Enter destination" className="travel-form__input" />
                    </div>
                </div>
                <div className="travel-form__field">
                    <label className="travel-form__label">Travel Date</label>
                    <div className="travel-form__input-wrap">
                        <Calendar size={15} />
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="travel-form__input" />
                    </div>
                </div>
                <div className="travel-form__field">
                    <label className="travel-form__label">Mode</label>
                    <div className="travel-form__modes">
                        {travelModes.map(m => {
                            const Icon = m.icon;
                            return (
                                <button key={m.id} className={`travel-form__mode ${mode === m.id ? 'travel-form__mode--active' : ''}`} onClick={() => setMode(m.id)}>
                                    <Icon size={16} />
                                    {m.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <button className="travel-form__submit" onClick={() => setSearched(true)}>
                    Analyze Route
                </button>
            </div>

            {/* Results */}
            {searched && (
                <motion.div className="travel-results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="travel-route">
                        <span className="travel-route__from">Hyderabad</span>
                        <div className="travel-route__line">
                            <ArrowRight size={16} />
                        </div>
                        <span className="travel-route__to">{destination}</span>
                    </div>

                    {/* Risk Assessment */}
                    <div className="travel-risk">
                        <div className="travel-risk__header">
                            <Shield size={18} />
                            <h3>Travel Risk Assessment</h3>
                        </div>
                        <div className="travel-risk__badge travel-risk__badge--moderate">Moderate Risk</div>
                        <p className="travel-risk__detail">
                            Heavy rainfall expected along the Hyderabad-Vijayawada corridor between 4 PM and 9 PM. Consider early departure or delayed travel.
                        </p>
                    </div>

                    {/* Advisory Grid */}
                    <div className="travel-advisory-grid">
                        {[
                            { icon: CloudRain, title: 'Rain Periods', detail: '4 PM — 9 PM: Heavy rain along NH65 between Suryapet and Kodad. Visibility drops likely.' },
                            { icon: Clock, title: 'Best Departure', detail: 'Before 11 AM or after 10 PM. Avoid 3 PM — 8 PM corridor for safest conditions.' },
                            { icon: Wind, title: 'Road Conditions', detail: 'Water accumulation possible on NH65 near Nalgonda. Aquaplaning risk on highway sections.' },
                            { icon: Eye, title: 'Visibility', detail: 'Reduced to 2-4 km during rainfall. Fog unlikely. Night visibility acceptable after 10 PM.' },
                            { icon: Umbrella, title: 'What to Carry', detail: 'Rain gear, flashlight, fully charged phone. Keep emergency contacts accessible.' },
                            { icon: Zap, title: 'Alerts Active', detail: 'IMD Yellow Alert for Telangana & AP. Monitor for escalation to Orange during afternoon.' },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div className="travel-advisory-card" key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                                    <div className="travel-advisory-card__icon"><Icon size={18} strokeWidth={1.5} /></div>
                                    <h4 className="travel-advisory-card__title">{item.title}</h4>
                                    <p className="travel-advisory-card__detail">{item.detail}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
