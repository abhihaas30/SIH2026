import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, MapPin, Clock, Shield, ChevronRight } from 'lucide-react';
import { alerts } from '../data/weatherData';
import './Alerts.css';

const severityConfig = {
    critical: { icon: AlertTriangle, color: 'var(--color-critical)', bg: 'var(--color-critical-subtle)', label: 'CRITICAL' },
    high: { icon: AlertTriangle, color: 'var(--color-high)', bg: 'var(--color-high-subtle)', label: 'HIGH' },
    moderate: { icon: AlertCircle, color: 'var(--color-moderate)', bg: 'var(--color-moderate-subtle)', label: 'MODERATE' },
    information: { icon: Info, color: 'var(--color-info)', bg: 'var(--color-info-subtle)', label: 'INFORMATION' },
};

export default function Alerts() {
    return (
        <motion.div
            className="alerts-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="alerts-page__header">
                <div>
                    <span className="label">Active Alerts</span>
                    <h2 className="alerts-page__title">Weather Alerts</h2>
                    <p className="alerts-page__desc">Real-time weather warnings and advisories for your monitored locations.</p>
                </div>
                <div className="alerts-page__summary">
                    <div className="alerts-summary-item">
                        <span className="alerts-summary-item__count" style={{ color: 'var(--color-high)' }}>1</span>
                        <span className="alerts-summary-item__label">High</span>
                    </div>
                    <div className="alerts-summary-item">
                        <span className="alerts-summary-item__count" style={{ color: 'var(--color-moderate)' }}>1</span>
                        <span className="alerts-summary-item__label">Moderate</span>
                    </div>
                    <div className="alerts-summary-item">
                        <span className="alerts-summary-item__count" style={{ color: 'var(--color-info)' }}>1</span>
                        <span className="alerts-summary-item__label">Info</span>
                    </div>
                </div>
            </div>

            <div className="alerts-list">
                {alerts.map((alert, i) => {
                    const config = severityConfig[alert.severity];
                    const Icon = config.icon;
                    return (
                        <motion.article
                            className="alert-card"
                            key={alert.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            style={{ '--alert-color': config.color }}
                        >
                            <div className="alert-card__severity-bar" style={{ background: config.color }} />
                            <div className="alert-card__content">
                                <div className="alert-card__top">
                                    <div className="alert-card__badge" style={{ background: config.bg, color: config.color }}>
                                        <Icon size={13} />
                                        {config.label}
                                    </div>
                                    <span className="alert-card__issued mono">Issued {alert.issuedAt}</span>
                                </div>

                                <h3 className="alert-card__title">{alert.title}</h3>
                                <p className="alert-card__description">{alert.description}</p>

                                <div className="alert-card__meta">
                                    <div className="alert-card__meta-item">
                                        <MapPin size={13} />
                                        <span>{alert.location}</span>
                                    </div>
                                    <div className="alert-card__meta-item">
                                        <Clock size={13} />
                                        <span>{alert.time}</span>
                                    </div>
                                    <div className="alert-card__meta-item">
                                        <Shield size={13} />
                                        <span>{alert.source}</span>
                                    </div>
                                </div>

                                <div className="alert-card__action">
                                    <span className="alert-card__action-label">What to do</span>
                                    <p className="alert-card__action-text">{alert.action}</p>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </motion.div>
    );
}
