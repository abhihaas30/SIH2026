import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Zap, MapPin, CloudSun, AlertTriangle, BookOpen, CheckCircle2,
    Loader2, ChevronRight
} from 'lucide-react';
import { chatSuggestions, sampleChatMessages } from '../data/weatherData';
import './Chat.css';

const processingSteps = [
    { icon: MapPin, label: 'Understanding location', duration: 600 },
    { icon: CloudSun, label: 'Checking forecast', duration: 800 },
    { icon: AlertTriangle, label: 'Evaluating risk', duration: 700 },
    { icon: BookOpen, label: 'Consulting evidence', duration: 600 },
    { icon: CheckCircle2, label: 'Preparing recommendation', duration: 500 },
];

function ProcessingAnimation({ onComplete }) {
    const [current, setCurrent] = useState(0);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        if (current < processingSteps.length) {
            const timer = setTimeout(() => {
                setCompleted(prev => [...prev, current]);
                setCurrent(prev => prev + 1);
            }, processingSteps[current].duration);
            return () => clearTimeout(timer);
        } else {
            const done = setTimeout(onComplete, 300);
            return () => clearTimeout(done);
        }
    }, [current, onComplete]);

    return (
        <div className="chat-processing">
            {processingSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === current;
                const isDone = completed.includes(i);
                return (
                    <motion.div
                        className={`chat-processing__step ${isActive ? 'chat-processing__step--active' : ''} ${isDone ? 'chat-processing__step--done' : ''}`}
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        {isDone ? (
                            <CheckCircle2 size={14} className="chat-processing__icon chat-processing__icon--done" />
                        ) : isActive ? (
                            <Loader2 size={14} className="chat-processing__icon chat-processing__icon--spin" />
                        ) : (
                            <Icon size={14} className="chat-processing__icon" />
                        )}
                        <span>{step.label}</span>
                    </motion.div>
                );
            })}
        </div>
    );
}

function AssistantMessage({ content }) {
    if (typeof content === 'string') {
        return <p className="chat-msg__text">{content}</p>;
    }

    return (
        <div className="chat-structured">
            <div className="chat-structured__section">
                <span className="chat-structured__label">Answer</span>
                <p className="chat-structured__text">{content.answer}</p>
            </div>
            <div className="chat-structured__section chat-structured__section--risk">
                <span className="chat-structured__label">Risk</span>
                <p className="chat-structured__text">{content.risk}</p>
            </div>
            <div className="chat-structured__section">
                <span className="chat-structured__label">Why</span>
                <p className="chat-structured__text">{content.why}</p>
            </div>
            <div className="chat-structured__section">
                <span className="chat-structured__label">What to Do</span>
                <ul className="chat-structured__actions">
                    {content.action.map((a, i) => (
                        <li key={i}>{a}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-structured__section chat-structured__section--sources">
                <span className="chat-structured__label">Sources</span>
                <div className="chat-structured__sources">
                    {content.sources.map((s, i) => (
                        <span className="chat-structured__source" key={i}>{s}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Chat() {
    const [messages, setMessages] = useState(sampleChatMessages);
    const [input, setInput] = useState('');
    const [processing, setProcessing] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, processing]);

    const handleSend = () => {
        if (!input.trim() || processing) return;
        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setProcessing(true);
    };

    const handleProcessingComplete = () => {
        setProcessing(false);
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: {
                answer: 'Based on current conditions, tonight will see intermittent rainfall between 6 PM and 10 PM, with the heaviest period around 7-8 PM. Expect 15-25 mm of accumulation.',
                risk: 'Moderate — Primary concerns are reduced visibility and waterlogged roads in low-lying areas of the city.',
                why: 'The active monsoon trough continues to influence Telangana. Upper-air analysis shows strong moisture convergence at 850 hPa, supporting continued convective rainfall through the evening.',
                action: [
                    'Keep an umbrella and waterproof footwear ready',
                    'Avoid driving through waterlogged areas',
                    'Rainfall should ease after 10 PM — plan outdoor activities accordingly',
                    'Check IMD updates for any escalation in warnings',
                ],
                sources: ['IMD Hyderabad (Live)', 'GFS 06Z Run', 'ERA5 Climatology'],
            },
        }]);
    };

    const handleSuggestion = (s) => {
        setInput(s);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    return (
        <div className="chat-page">
            {/* Header */}
            <div className="chat-page__header">
                <div className="chat-page__header-icon">
                    <Zap size={22} strokeWidth={2} />
                </div>
                <div>
                    <h2 className="chat-page__title">Ask the atmosphere.</h2>
                    <p className="chat-page__subtitle">
                        Weather intelligence that understands what you're asking — and why it matters.
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="chat-page__messages" ref={scrollRef}>
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            className={`chat-msg chat-msg--${msg.role}`}
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {msg.role === 'assistant' && (
                                <div className="chat-msg__avatar">
                                    <Zap size={14} />
                                </div>
                            )}
                            <div className="chat-msg__content">
                                {msg.role === 'user' ? (
                                    <p className="chat-msg__text">{msg.content}</p>
                                ) : (
                                    <AssistantMessage content={msg.content} />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {processing && (
                    <motion.div
                        className="chat-msg chat-msg--assistant"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="chat-msg__avatar">
                            <Zap size={14} />
                        </div>
                        <div className="chat-msg__content">
                            <ProcessingAnimation onComplete={handleProcessingComplete} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && !processing && (
                <div className="chat-page__suggestions">
                    {chatSuggestions.map((s, i) => (
                        <button className="chat-page__suggestion" key={i} onClick={() => handleSuggestion(s)}>
                            {s}
                            <ChevronRight size={13} />
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="chat-page__input-area">
                <div className="chat-page__input-wrap">
                    <input
                        ref={inputRef}
                        type="text"
                        className="chat-page__input"
                        placeholder="Ask about weather, risks, travel, agriculture..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={processing}
                    />
                    <button
                        className={`chat-page__send ${input.trim() ? 'chat-page__send--active' : ''}`}
                        onClick={handleSend}
                        disabled={!input.trim() || processing}
                        aria-label="Send message"
                    >
                        <Send size={16} />
                    </button>
                </div>
                <span className="chat-page__disclaimer">
                    WeatherGPT uses AI to interpret weather data. Always verify critical decisions with official sources.
                </span>
            </div>
        </div>
    );
}
