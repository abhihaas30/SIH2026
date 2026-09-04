import { motion } from 'framer-motion';
import { Shield, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { disasterIntelligence } from '../data/weatherData';
import './Disaster.css';

const riskColors = {
    low: 'var(--color-low)',
    moderate: 'var(--color-moderate)',
    high: 'var(--color-high)',
    critical: 'var(--color-critical)',
};

const riskBg = {
    low: 'var(--color-low-subtle)',
    moderate: 'var(--color-moderate-subtle)',
    high: 'var(--color-high-subtle)',
    critical: 'var(--color-critical-subtle)',
};

const trendIcons = {
    increasing: TrendingUp,
    decreasing: TrendingDown,
    stable: Minus,
};

export default function Disaster() {
    const highRisk = disasterIntelligence.filter(d => d.risk === 'high' || d.risk === 'critical');

    return (
        <motion.div
            className="disaster-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="disaster-page__header">
                <span className="label">Command Centre</span>
                <h2 className="disaster-page__title">Disaster Intelligence</h2>
                <p className="disaster-page__desc">
                    Real-time monitoring of severe weather threats and natural disaster risk across your regions.
                </p>
            </div>

            {/* Overview Bar */}
            <div className="disaster-overview">
                <div className="disaster-overview__item disaster-overview__item--highlight">
                    <AlertTriangle size={18} />
                    <span className="disaster-overview__count">{highRisk.length}</span>
                    <span className="disaster-overview__label">High/Critical Threats</span>
                </div>
                <div className="disaster-overview__item">
                    <span className="disaster-overview__count">{disasterIntelligence.length}</span>
                    <span className="disaster-overview__label">Monitored</span>
                </div>
                <div className="disaster-overview__item">
                    <span className="disaster-overview__count">3</span>
                    <span className="disaster-overview__label">Regions</span>
                </div>
            </div>

            {/* Threat Matrix */}
            <div className="disaster-grid">
                {disasterIntelligence.map((d, i) => {
                    const TrendIcon = trendIcons[d.trend];
                    return (
                        <motion.div
                            className="threat-card"
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                        >
                            <div className="threat-card__header">
                                <h4 className="threat-card__type">{d.type}</h4>
                                <span
                                    className="threat-card__risk"
                                    style={{ background: riskBg[d.risk], color: riskColors[d.risk] }}
                                >
                                    {d.risk.toUpperCase()}
                                </span>
                            </div>

                            <div className="threat-card__probability">
                                <div className="threat-card__prob-bar-bg">
                                    <motion.div
                                        className="threat-card__prob-bar"
                                        style={{ background: riskColors[d.risk] }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${d.probability}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                                    />
                                </div>
                                <div className="threat-card__prob-meta">
                                    <span className="threat-card__prob-value mono">{d.probability}%</span>
                                    <span className="threat-card__trend">
                                        <TrendIcon size={13} />
                                        {d.trend}
                                    </span>
                                </div>
                            </div>

                            <p className="threat-card__detail">{d.detail}</p>

                            <div className="threat-card__region">
                                <Shield size={12} />
                                <span>{d.region}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
