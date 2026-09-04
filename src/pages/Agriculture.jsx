import { motion } from 'framer-motion';
import { Droplets, CloudRain, Layers, Wind, Thermometer, Sprout, ArrowRight } from 'lucide-react';
import { agricultureData } from '../data/weatherData';
import './Agriculture.css';

const iconMap = { droplets: Droplets, 'cloud-rain': CloudRain, layers: Layers, wind: Wind, thermometer: Thermometer };

export default function Agriculture() {
    return (
        <motion.div
            className="agri-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="agri-page__header">
                <span className="label">Farm Intelligence</span>
                <h2 className="agri-page__title">Today's Farming Conditions</h2>
                <p className="agri-page__desc">
                    Weather-informed agricultural guidance based on real-time conditions and forecast models.
                </p>
            </div>

            <div className="agri-grid">
                {agricultureData.conditions.map((c, i) => {
                    const Icon = iconMap[c.icon] || Sprout;
                    return (
                        <motion.div
                            className="agri-card"
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <div className="agri-card__icon" style={{ color: c.color }}>
                                <Icon size={20} strokeWidth={1.5} />
                            </div>
                            <div className="agri-card__info">
                                <span className="agri-card__name">{c.name}</span>
                                <span className="agri-card__status" style={{ color: c.color }}>{c.status}</span>
                                <span className="agri-card__detail">{c.detail}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                className="agri-recommendation"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="agri-recommendation__header">
                    <Sprout size={20} strokeWidth={1.5} />
                    <span className="label">AI Recommendation</span>
                </div>
                <h3 className="agri-recommendation__title">{agricultureData.recommendation.title}</h3>
                <p className="agri-recommendation__reason">{agricultureData.recommendation.reason}</p>
                <ul className="agri-recommendation__actions">
                    {agricultureData.recommendation.actions.map((a, i) => (
                        <li key={i}>
                            <ArrowRight size={14} />
                            <span>{a}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
}
