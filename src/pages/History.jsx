import { motion } from 'framer-motion';
import { Calendar, Thermometer, Droplets, Wind, ChevronDown, Activity } from 'lucide-react';
import { historyData } from '../data/weatherData';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import './History.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="history-tooltip">
            <span className="history-tooltip__label">{label}</span>
            <span className="history-tooltip__value" style={{ color: '#fb923c' }}>High: {payload[0].value}°</span>
            <span className="history-tooltip__value" style={{ color: '#60a5fa' }}>Rain: {payload[1].value}mm</span>
        </div>
    );
};

export default function History() {
    return (
        <motion.div
            className="history-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="history-page__header">
                <span className="label">Climatology</span>
                <h2 className="history-page__title">Historical Weather</h2>
                <p className="history-page__desc">Explore long-term climate trends and historical anomalies for this region.</p>
            </div>

            <div className="history-controls">
                <button className="history-dropdown">
                    2026 <ChevronDown size={14} />
                </button>
                <button className="history-dropdown">
                    Annually <ChevronDown size={14} />
                </button>
                <button className="history-dropdown">
                    Temperature & Rain <ChevronDown size={14} />
                </button>
            </div>

            <motion.section
                className="history-chart-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h3 className="history-chart__title">Annual Climate Trend</h3>
                <div className="history-chart__wrap">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={historyData.monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fb923c" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="avgHigh" stroke="#fb923c" strokeWidth={2} fill="url(#tempGrad)" />
                            <Area type="monotone" dataKey="rainfall" stroke="#60a5fa" strokeWidth={2} fill="url(#rainGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>

            <motion.section
                className="history-anomalies"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="history-anomalies__title">Significant Events (2026)</h3>
                <div className="history-anomalies__grid">
                    {historyData.anomalies.map((a, i) => (
                        <div className="history-anomaly" key={i}>
                            <div className="history-anomaly__header">
                                <Activity size={16} color="var(--color-high)" />
                                <span className="history-anomaly__date">{a.date}</span>
                            </div>
                            <h4 className="history-anomaly__type">{a.type}</h4>
                            <div className="history-anomaly__stats">
                                <span className="history-anomaly__value">{a.value}</span>
                                <span className="history-anomaly__comparison">{a.comparison}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

        </motion.div>
    );
}
