import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Droplets, Wind, Eye, Gauge, Thermometer, ArrowUpRight,
    MessageSquare, Car, Sun, Clock, Heart, Zap,
    ChevronRight, ExternalLink, Database, Radio, BarChart3, Shield
} from 'lucide-react';
import {
    currentWeather, riskAssessment, hourlyForecast,
    actionItems, evidenceSources, chatSuggestions
} from '../data/weatherData';
import './Dashboard.css';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
    animate: { transition: { staggerChildren: 0.08 } }
};

function RiskMeter({ score }) {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score >= 75) return 'var(--color-critical)';
        if (score >= 50) return 'var(--color-moderate)';
        if (score >= 25) return 'var(--color-high)';
        return 'var(--color-low)';
    };

    return (
        <div className="risk-meter">
            <svg viewBox="0 0 120 120" className="risk-meter__svg">
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-border)" strokeWidth="4" />
                <motion.circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke={getColor()}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className="risk-meter__value">
                <motion.span
                    className="risk-meter__number"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    {score}
                </motion.span>
                <span className="risk-meter__label">/ 100</span>
            </div>
        </div>
    );
}

const actionIcons = { car: Car, sun: Sun, clock: Clock, heart: Heart };
const factorStatusColors = {
    normal: 'var(--color-low)',
    elevated: 'var(--color-moderate)',
    warning: 'var(--color-high)',
    critical: 'var(--color-critical)',
};

export default function Dashboard() {
    return (
        <motion.div className="dashboard" initial="initial" animate="animate" variants={stagger}>

            {/* ============ 01 — CURRENT CONDITIONS ============ */}
            <motion.section className="dash-hero" variants={fadeUp}>
                <div className="dash-hero__atmosphere" />
                <div className="dash-hero__content">
                    <div className="dash-hero__primary">
                        <div className="dash-hero__location">
                            <span className="label">Current Location</span>
                            <h2 className="dash-hero__city">{currentWeather.location}</h2>
                            <p className="dash-hero__region">{currentWeather.region}</p>
                        </div>
                        <div className="dash-hero__temp-wrap">
                            <span className="dash-hero__temp">{currentWeather.temperature}°</span>
                            <div className="dash-hero__condition">
                                <span className="dash-hero__condition-text">{currentWeather.condition}</span>
                                <span className="dash-hero__condition-desc">{currentWeather.conditionDesc}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dash-hero__metrics">
                        {[
                            { icon: Thermometer, label: 'Feels Like', value: `${currentWeather.feelsLike}°`, unit: '' },
                            { icon: Droplets, label: 'Humidity', value: currentWeather.humidity, unit: '%' },
                            { icon: Wind, label: 'Wind', value: `${currentWeather.wind.speed}`, unit: `km/h ${currentWeather.wind.direction}` },
                            { icon: Eye, label: 'Visibility', value: currentWeather.visibility, unit: 'km' },
                            { icon: Gauge, label: 'Pressure', value: currentWeather.pressure, unit: 'hPa' },
                        ].map((m, i) => (
                            <div className="dash-hero__metric" key={i}>
                                <m.icon size={15} strokeWidth={1.5} />
                                <span className="dash-hero__metric-label">{m.label}</span>
                                <span className="dash-hero__metric-value">{m.value}<span className="dash-hero__metric-unit">{m.unit}</span></span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ============ 02 — AI WEATHER RISK ============ */}
            <motion.section className="dash-risk" variants={fadeUp}>
                <div className="dash-risk__header">
                    <div>
                        <span className="label">01 — Risk Assessment</span>
                        <h3 className="dash-risk__title">Today's Weather Risk</h3>
                    </div>
                    <div className="dash-risk__level" data-level={riskAssessment.level.toLowerCase()}>
                        {riskAssessment.level}
                    </div>
                </div>

                <div className="dash-risk__body">
                    <div className="dash-risk__visual">
                        <RiskMeter score={riskAssessment.score} />
                    </div>
                    <div className="dash-risk__info">
                        <blockquote className="dash-risk__headline">
                            "{riskAssessment.headline}"
                        </blockquote>
                        <p className="dash-risk__summary">{riskAssessment.summary}</p>
                    </div>
                </div>

                <div className="dash-risk__why">
                    <h4 className="dash-risk__why-title">
                        <span className="dash-risk__why-icon">?</span>
                        Why this assessment
                    </h4>
                    <div className="dash-risk__factors">
                        {riskAssessment.factors.map((f, i) => (
                            <div className="dash-risk__factor" key={i}>
                                <div className="dash-risk__factor-header">
                                    <span className="dash-risk__factor-dot" style={{ background: factorStatusColors[f.status] }} />
                                    <span className="dash-risk__factor-name">{f.name}</span>
                                    <span className="dash-risk__factor-value">{f.value}{f.unit ? ` ${f.unit}` : ''}</span>
                                </div>
                                <p className="dash-risk__factor-detail">{f.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ============ 03 — WEATHERGPT ============ */}
            <motion.section className="dash-gpt" variants={fadeUp}>
                <div className="dash-gpt__content">
                    <div className="dash-gpt__intro">
                        <span className="label">02 — Intelligence</span>
                        <h3 className="dash-gpt__title">Ask WeatherGPT</h3>
                        <p className="dash-gpt__desc">Weather intelligence that understands what you're asking — and why it matters.</p>
                    </div>
                    <div className="dash-gpt__input-wrap">
                        <Link to="/chat" className="dash-gpt__input-fake">
                            <MessageSquare size={16} strokeWidth={1.5} />
                            <span>What should I know about the weather today?</span>
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div className="dash-gpt__suggestions">
                        {chatSuggestions.slice(0, 4).map((s, i) => (
                            <Link to="/chat" className="dash-gpt__suggestion" key={i}>
                                {s}
                                <ChevronRight size={13} />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="dash-gpt__accent" />
            </motion.section>

            {/* ============ 04 — HOURLY FORECAST ============ */}
            <motion.section className="dash-forecast" variants={fadeUp}>
                <div className="dash-forecast__header">
                    <div>
                        <span className="label">03 — Forecast Timeline</span>
                        <h3 className="dash-section-title">Next 12 Hours</h3>
                    </div>
                    <Link to="/forecast" className="dash-link">
                        Full Forecast <ArrowUpRight size={14} />
                    </Link>
                </div>
                <div className="dash-forecast__timeline">
                    {hourlyForecast.map((h, i) => {
                        const isRain = h.rain > 50;
                        const barHeight = Math.max(h.rain, 8);
                        return (
                            <div className={`dash-forecast__hour ${isRain ? 'dash-forecast__hour--rain' : ''}`} key={i}>
                                <span className="dash-forecast__hour-temp">{h.temp}°</span>
                                <div className="dash-forecast__hour-bar-wrap">
                                    <motion.div
                                        className="dash-forecast__hour-bar"
                                        style={{
                                            height: `${barHeight}%`,
                                            background: isRain
                                                ? 'linear-gradient(to top, var(--color-rain), rgba(96,165,250,0.3))'
                                                : 'linear-gradient(to top, var(--color-text-tertiary), rgba(240,240,242,0.08))',
                                        }}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${barHeight}%` }}
                                        transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </div>
                                <span className="dash-forecast__hour-rain">{h.rain}%</span>
                                <span className="dash-forecast__hour-time">{h.time}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.section>

            {/* ============ 05 — ACTIONS ============ */}
            <motion.section className="dash-actions" variants={fadeUp}>
                <div className="dash-actions__header">
                    <span className="label">04 — Recommendations</span>
                    <h3 className="dash-section-title">What Should I Do?</h3>
                </div>
                <div className="dash-actions__grid">
                    {actionItems.map((a, i) => {
                        const Icon = actionIcons[a.icon] || Zap;
                        return (
                            <motion.div
                                className="dash-action"
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.08 }}
                            >
                                <div className="dash-action__icon">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <div className="dash-action__content">
                                    <span className="dash-action__category">{a.category}</span>
                                    <p className="dash-action__message">{a.message}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* ============ 06 — EVIDENCE ============ */}
            <motion.section className="dash-evidence" variants={fadeUp}>
                <div className="dash-evidence__header">
                    <span className="label">05 — Data Sources</span>
                    <h3 className="dash-section-title">Evidence & Trust</h3>
                </div>
                <div className="dash-evidence__grid">
                    {evidenceSources.map((e, i) => {
                        const icons = [Radio, BarChart3, Database, Shield];
                        const Icon = icons[i] || Database;
                        return (
                            <div className="dash-evidence__item" key={i}>
                                <div className="dash-evidence__icon">
                                    <Icon size={16} strokeWidth={1.5} />
                                </div>
                                <div className="dash-evidence__info">
                                    <span className="dash-evidence__type">{e.type}</span>
                                    <span className="dash-evidence__source">{e.source}</span>
                                    <span className="dash-evidence__detail">{e.detail}</span>
                                </div>
                                <div className="dash-evidence__meta">
                                    <span className={`dash-evidence__freshness dash-evidence__freshness--${e.freshness.toLowerCase().replace(/[^a-z]/g, '')}`}>
                                        {e.freshness}
                                    </span>
                                    <span className="dash-evidence__time mono">{e.time}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.section>

        </motion.div>
    );
}
