// ============================================================
// WEATHERGPT — Mock Data
// ============================================================

export const currentWeather = {
    location: 'Hyderabad',
    region: 'Telangana, India',
    coordinates: { lat: 17.385, lon: 78.4867 },
    temperature: 28,
    feelsLike: 31,
    condition: 'Partly Cloudy',
    conditionDesc: 'Scattered cumulus with developing convective cells to the southwest',
    humidity: 72,
    wind: { speed: 14, direction: 'SW', gust: 22 },
    visibility: 8.5,
    pressure: 1008,
    uv: 6,
    dewPoint: 22,
    cloudCover: 45,
    sunrise: '06:02',
    sunset: '18:24',
    updatedAt: new Date().toISOString(),
};

export const riskAssessment = {
    level: 'Moderate',
    score: 58,
    headline: 'Rain probability increases significantly after 4 PM.',
    summary: 'Developing convective activity along the convergence zone may trigger isolated thunderstorms during late afternoon. Exercise caution for evening outdoor activities.',
    factors: [
        { name: 'Precipitation Probability', value: 68, unit: '%', status: 'elevated', detail: 'CAPE values suggest moderate convective potential' },
        { name: 'Atmospheric Instability', value: 'Moderate', status: 'elevated', detail: 'K-Index at 32, approaching thunderstorm threshold' },
        { name: 'Wind Pattern', value: 'SW 14 km/h', status: 'normal', detail: 'Consistent monsoonal flow, gusts possible during convection' },
        { name: 'Official Warning', value: 'Yellow Alert', status: 'warning', detail: 'IMD has issued a yellow alert for Telangana through tomorrow' },
    ],
};

export const hourlyForecast = [
    { time: '12 PM', temp: 28, rain: 10, condition: 'partly-cloudy', wind: 12, humidity: 70 },
    { time: '1 PM', temp: 29, rain: 12, condition: 'partly-cloudy', wind: 13, humidity: 68 },
    { time: '2 PM', temp: 30, rain: 18, condition: 'partly-cloudy', wind: 14, humidity: 66 },
    { time: '3 PM', temp: 30, rain: 35, condition: 'cloudy', wind: 16, humidity: 68 },
    { time: '4 PM', temp: 29, rain: 55, condition: 'cloudy', wind: 18, humidity: 72 },
    { time: '5 PM', temp: 27, rain: 72, condition: 'rain', wind: 22, humidity: 78 },
    { time: '6 PM', temp: 26, rain: 80, condition: 'rain', wind: 24, humidity: 82 },
    { time: '7 PM', temp: 25, rain: 65, condition: 'rain', wind: 20, humidity: 84 },
    { time: '8 PM', temp: 24, rain: 45, condition: 'cloudy', wind: 16, humidity: 82 },
    { time: '9 PM', temp: 24, rain: 30, condition: 'cloudy', wind: 14, humidity: 80 },
    { time: '10 PM', temp: 23, rain: 20, condition: 'partly-cloudy', wind: 12, humidity: 78 },
    { time: '11 PM', temp: 23, rain: 15, condition: 'partly-cloudy', wind: 10, humidity: 76 },
];

export const weeklyForecast = [
    { day: 'Today', date: 'Sep 4', high: 30, low: 23, rain: 68, condition: 'Thunderstorms', icon: 'storm', wind: 22, humidity: 78 },
    { day: 'Friday', date: 'Sep 5', high: 29, low: 22, rain: 75, condition: 'Heavy Rain', icon: 'rain', wind: 26, humidity: 85 },
    { day: 'Saturday', date: 'Sep 6', high: 28, low: 22, rain: 60, condition: 'Rain', icon: 'rain', wind: 18, humidity: 80 },
    { day: 'Sunday', date: 'Sep 7', high: 30, low: 23, rain: 35, condition: 'Partly Cloudy', icon: 'partly-cloudy', wind: 14, humidity: 72 },
    { day: 'Monday', date: 'Sep 8', high: 32, low: 24, rain: 20, condition: 'Mostly Sunny', icon: 'sunny', wind: 12, humidity: 65 },
    { day: 'Tuesday', date: 'Sep 9', high: 33, low: 25, rain: 15, condition: 'Sunny', icon: 'sunny', wind: 10, humidity: 58 },
    { day: 'Wednesday', date: 'Sep 10', high: 32, low: 24, rain: 25, condition: 'Partly Cloudy', icon: 'partly-cloudy', wind: 14, humidity: 64 },
];

export const actionItems = [
    { category: 'TRAVEL', icon: 'car', message: 'Carry rain protection after 4 PM. Roads may be slippery during evening hours.', severity: 'moderate' },
    { category: 'OUTDOOR', icon: 'sun', message: 'Outdoor activity is safer before 3 PM. Lightning risk increases with afternoon convection.', severity: 'moderate' },
    { category: 'COMMUTE', icon: 'clock', message: 'Allow additional travel time during evening rainfall. Visibility may drop below 4 km.', severity: 'low' },
    { category: 'HEALTH', icon: 'heart', message: 'Humidity above 75% after 5 PM. Stay hydrated and avoid prolonged exertion.', severity: 'low' },
];

export const evidenceSources = [
    { type: 'Weather Observation', source: 'IMD Hyderabad AWS', time: '12:30 PM IST', freshness: 'Live', detail: 'Automated weather station at Begumpet' },
    { type: 'Forecast Model', source: 'GFS + IMD Ensemble', time: '06:00 AM IST', freshness: '6h ago', detail: 'Global Forecast System 0.25° resolution' },
    { type: 'Historical Pattern', source: 'Climate Archive', time: 'Sep 4 average', freshness: 'Seasonal', detail: 'Based on 30-year climatological analysis' },
    { type: 'Official Warning', source: 'IMD Bulletin', time: '11:00 AM IST', freshness: '1.5h ago', detail: 'India Meteorological Department regional forecast' },
];

export const alerts = [
    {
        id: 1,
        severity: 'high',
        title: 'Thunderstorm Warning',
        description: 'Isolated thunderstorms with gusty winds expected over Hyderabad and surrounding districts between 4 PM and 9 PM.',
        location: 'Hyderabad, Rangareddy, Medchal-Malkajgiri',
        time: 'Today, 4:00 PM — 9:00 PM',
        issuedAt: '11:30 AM IST',
        source: 'IMD Regional Centre',
        action: 'Avoid open areas during thunderstorm period. Secure loose objects. Stay away from trees and electrical equipment.',
    },
    {
        id: 2,
        severity: 'moderate',
        title: 'Heavy Rainfall Alert',
        description: 'Heavy rainfall (64-115 mm) likely over parts of Telangana during the next 48 hours due to active monsoon conditions.',
        location: 'Telangana State',
        time: 'Sep 4 — Sep 6',
        issuedAt: '09:00 AM IST',
        source: 'IMD National Bulletin',
        action: 'Monitor local drainage conditions. Avoid low-lying areas prone to waterlogging. Keep emergency supplies ready.',
    },
    {
        id: 3,
        severity: 'information',
        title: 'Monsoon Update',
        description: 'Southwest monsoon remains active over Telangana. Above-normal rainfall expected for the remainder of the first week of September.',
        location: 'All Districts',
        time: 'Sep 4 — Sep 10',
        issuedAt: '08:00 AM IST',
        source: 'IMD Extended Outlook',
        action: 'Plan outdoor activities considering daily afternoon rainfall pattern. Agriculture operations should account for wet conditions.',
    },
];

export const disasterIntelligence = [
    { type: 'Extreme Rainfall', risk: 'high', probability: 72, trend: 'increasing', detail: 'Active monsoon trough passing through the region', region: 'Telangana, AP' },
    { type: 'Flood Risk', risk: 'moderate', probability: 45, trend: 'stable', detail: 'River levels normal but rising. Tributaries of Musi River under watch.', region: 'Hyderabad Urban' },
    { type: 'Cyclone', risk: 'low', probability: 5, trend: 'stable', detail: 'No tropical disturbance in Bay of Bengal. Next monitoring window: Sep 15.', region: 'Bay of Bengal' },
    { type: 'Thunderstorm', risk: 'high', probability: 68, trend: 'increasing', detail: 'CAPE exceeding 1500 J/kg, favorable for isolated severe thunderstorms.', region: 'North Telangana' },
    { type: 'Heatwave', risk: 'low', probability: 2, trend: 'decreasing', detail: 'Monsoon conditions preclude extreme heat. Temperatures near normal.', region: 'Telangana' },
    { type: 'Strong Winds', risk: 'moderate', probability: 55, trend: 'increasing', detail: 'Gusty winds 40-50 km/h possible during convective outflows.', region: 'Greater Hyderabad' },
];

export const agricultureData = {
    conditions: [
        { name: 'Irrigation', status: 'Not Needed', detail: 'Sufficient soil moisture from recent rainfall', icon: 'droplets', color: 'var(--color-rain)' },
        { name: 'Rainfall', status: '15-25 mm expected', detail: 'Late afternoon showers likely', icon: 'cloud-rain', color: 'var(--color-rain)' },
        { name: 'Soil Moisture', status: 'Adequate', detail: '78% field capacity, optimal range', icon: 'layers', color: 'var(--color-low)' },
        { name: 'Spraying Conditions', status: 'Poor', detail: 'Wind and rain forecast — delay application', icon: 'wind', color: 'var(--color-high)' },
        { name: 'Heat Stress', status: 'Low', detail: 'Max temperature 30°C, within crop tolerance', icon: 'thermometer', color: 'var(--color-low)' },
        { name: 'Wind Conditions', status: 'Moderate', detail: '14 km/h gusting to 22 km/h', icon: 'wind', color: 'var(--color-moderate)' },
    ],
    recommendation: {
        title: 'Delay pesticide spraying until tomorrow morning',
        reason: 'Rainfall probability is high (68%) for this afternoon and winds exceed the 15 km/h threshold for effective spray application. Morning conditions on Sep 5 show lower wind and a dry window between 6-10 AM.',
        actions: [
            'Harvest any mature crops before 3 PM to avoid rain damage',
            'Ensure drainage channels are clear for expected rainfall',
            'Schedule spraying for tomorrow 6-10 AM window',
            'Monitor IMD bulletin for updated rainfall estimates',
        ],
    },
};

export const savedLocations = [
    { id: 1, name: 'Hyderabad', region: 'Telangana', isDefault: true, lat: 17.385, lon: 78.486, alerts: true },
    { id: 2, name: 'Warangal', region: 'Telangana', isDefault: false, lat: 17.978, lon: 79.599, alerts: true },
    { id: 3, name: 'Visakhapatnam', region: 'Andhra Pradesh', isDefault: false, lat: 17.686, lon: 83.218, alerts: true },
    { id: 4, name: 'Chennai', region: 'Tamil Nadu', isDefault: false, lat: 13.082, lon: 80.270, alerts: false },
    { id: 5, name: 'Bengaluru', region: 'Karnataka', isDefault: false, lat: 12.971, lon: 77.594, alerts: false },
];

export const historyData = {
    monthly: [
        { month: 'Jan', avgHigh: 30, avgLow: 16, rainfall: 5 },
        { month: 'Feb', avgHigh: 33, avgLow: 18, rainfall: 8 },
        { month: 'Mar', avgHigh: 36, avgLow: 21, rainfall: 12 },
        { month: 'Apr', avgHigh: 38, avgLow: 24, rainfall: 25 },
        { month: 'May', avgHigh: 39, avgLow: 26, rainfall: 35 },
        { month: 'Jun', avgHigh: 34, avgLow: 24, rainfall: 105 },
        { month: 'Jul', avgHigh: 31, avgLow: 23, rainfall: 165 },
        { month: 'Aug', avgHigh: 30, avgLow: 22, rainfall: 175 },
        { month: 'Sep', avgHigh: 31, avgLow: 22, rainfall: 160 },
        { month: 'Oct', avgHigh: 31, avgLow: 20, rainfall: 85 },
        { month: 'Nov', avgHigh: 30, avgLow: 17, rainfall: 20 },
        { month: 'Dec', avgHigh: 29, avgLow: 15, rainfall: 8 },
    ],
    anomalies: [
        { date: 'Aug 28, 2026', type: 'Excessive Rainfall', value: '145 mm in 24h', comparison: '340% above normal' },
        { date: 'Aug 15, 2026', type: 'Temperature Anomaly', value: '24°C maximum', comparison: '6°C below normal' },
        { date: 'Jul 22, 2026', type: 'Wind Event', value: '78 km/h gusts', comparison: 'Severe thunderstorm downburst' },
    ],
};

export const chatSuggestions = [
    'Will it rain tonight?',
    'Should I travel tomorrow?',
    'Is this safe for outdoor work?',
    'Explain today\'s weather.',
    'When is the best time to go outside?',
    'Should I carry an umbrella?',
];

export const sampleChatMessages = [
    {
        role: 'user',
        content: 'What should I know about the weather today?',
    },
    {
        role: 'assistant',
        content: {
            answer: 'Today in Hyderabad, expect partly cloudy conditions through the early afternoon, with a significant shift toward thunderstorms after 4 PM. Temperatures will peak at 30°C before cooling with the rain to around 24°C by evening.',
            risk: 'Moderate — The primary risk window is between 4 PM and 9 PM when convective activity peaks. Lightning and gusty winds up to 50 km/h are possible during this period.',
            why: 'An active monsoon trough is passing through Telangana, combined with CAPE values exceeding 1500 J/kg, creating conditions favorable for isolated severe thunderstorms. The convergence zone is positioned directly over the greater Hyderabad region.',
            action: [
                'Complete outdoor activities before 3 PM',
                'Carry rain protection if going out after 3 PM',
                'Avoid open areas during the thunderstorm window (4-9 PM)',
                'Allow extra commute time for evening travel',
            ],
            sources: ['IMD Hyderabad AWS (Live)', 'GFS Model Run 06Z', 'IMD Yellow Alert Bulletin'],
        },
    },
];
