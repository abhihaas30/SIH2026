import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
    CartesianGrid, BarChart, Bar
} from 'recharts';
import { Sunrise, Sunset, Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import { hourlyForecast, weeklyForecast, currentWeather } from '../data/weatherData';
import './Forecast.css';

const tabs = ['Temperature', 'Rain', 'Wind', 'Humidity'];

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="forecast-tooltip">
            <span className="forecast-tooltip__label">{label}</span>
            {payload.map((p, i) => (
                <span className="forecast-tooltip__value" key={i} style={{ color: p.color }}>
                    {p.name}: {p.value}{p.name === 'Temperature' ? '°' : p.name === 'Rain' ? '%' : p.name === 'Humidity' ? '%' : ' km/h'}
                </span>
            ))}
        </div>
    );
};

export default function Forecast() {
    const [activeTab, setActiveTab] = useState('Temperature');

    const getChartData = () => {
        return hourlyForecast.map(h => ({
            time: h.time,
            Temperature: h.temp,
            Rain: h.rain,
            Wind: h.wind,
            Humidity: h.humidity,
        }));
    };

    const getChartColor = () => {
        switch (activeTab) {
            case 'Temperature': return '#f97316';
            case 'Rain': return '#60a5fa';
            case 'Wind': return '#34d399';
            case 'Humidity': return '#a78bfa';
            default: return '#6366f1';
        }
    };

    return (
        <motion.div className="forecast-page" initial="initial" animate="animate">

            {/* Current Overview */}
            <motion.section className="forecast-hero" variants={fadeUp}>
                <div className="forecast-hero__left">
                    <span className="label">Current Forecast</span>
                    <div className="forecast-hero__temp-row">
                        <span className="forecast-hero__temp">{currentWeather.temperature}°</span>
                        <div className="forecast-hero__condition">
                            <span className="forecast-hero__condition-name">{currentWeather.condition}</span>
                            <span className="forecast-hero__hl">H:{weeklyForecast[0].high}° L:{weeklyForecast[0].low}°</span>
                        </div>
                    </div>
                </div>
                <div className="forecast-hero__sun">
                    <div className="forecast-hero__sun-item">
                        <Sunrise size={16} strokeWidth={1.5} />
                        <span className="forecast-hero__sun-label">Sunrise</span>
                        <span className="forecast-hero__sun-time">{currentWeather.sunrise}</span>
                    </div>
                    <div className="forecast-hero__sun-divider" />
                    <div className="forecast-hero__sun-item">
                        <Sunset size={16} strokeWidth={1.5} />
                        <span className="forecast-hero__sun-label">Sunset</span>
                        <span className="forecast-hero__sun-time">{currentWeather.sunset}</span>
                    </div>
                </div>
            </motion.section>

            {/* Chart Section */}
            <motion.section className="forecast-chart-section" variants={fadeUp}>
                <div className="forecast-chart__header">
                    <h3 className="forecast-chart__title">Hourly Trend</h3>
                    <div className="forecast-chart__tabs">
                        {tabs.map(t => (
                            <button
                                key={t}
                                className={`forecast-chart__tab ${t === activeTab ? 'forecast-chart__tab--active' : ''}`}
                                onClick={() => setActiveTab(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="forecast-chart__wrap">
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={getChartColor()} stopOpacity={0.2} />
                                    <stop offset="100%" stopColor={getChartColor()} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey={activeTab}
                                stroke={getChartColor()}
                                strokeWidth={2}
                                fill="url(#chartGrad)"
                                dot={false}
                                activeDot={{ r: 4, fill: getChartColor(), stroke: 'var(--color-bg)', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>

            {/* Precipitation Graph */}
            <motion.section className="forecast-chart-section" variants={fadeUp}>
                <h3 className="forecast-chart__title">Precipitation Probability</h3>
                <div className="forecast-chart__wrap">
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                            <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Rain" fill="var(--color-rain)" radius={[4, 4, 0, 0]} maxBarSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>

            {/* 7-Day Forecast */}
            <motion.section className="forecast-weekly" variants={fadeUp}>
                <h3 className="forecast-chart__title">7-Day Forecast</h3>
                <div className="forecast-weekly__list">
                    {weeklyForecast.map((d, i) => (
                        <motion.div
                            className={`forecast-day ${i === 0 ? 'forecast-day--today' : ''}`}
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <div className="forecast-day__name">
                                <span className="forecast-day__day">{d.day}</span>
                                <span className="forecast-day__date mono">{d.date}</span>
                            </div>
                            <span className="forecast-day__condition">{d.condition}</span>
                            <div className="forecast-day__rain">
                                <Droplets size={12} />
                                <span className="mono">{d.rain}%</span>
                            </div>
                            <div className="forecast-day__temps">
                                <span className="forecast-day__high">{d.high}°</span>
                                <div className="forecast-day__bar">
                                    <div
                                        className="forecast-day__bar-fill"
                                        style={{
                                            left: `${((d.low - 18) / 24) * 100}%`,
                                            right: `${100 - ((d.high - 18) / 24) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="forecast-day__low">{d.low}°</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

        </motion.div>
    );
}
