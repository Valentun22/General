import {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {WeatherDay} from "../../interfaces/IWeatherDayInterface";
import css from './WeatherComponent.module.css';

const WeatherComponent: FC = () => {
    const {t} = useTranslation();
    const [temp, setTemp] = useState<number | null>(null);
    const [displayTemp, setDisplayTemp] = useState(0);
    const [desc, setDesc] = useState('');
    const [forecast, setForecast] = useState<WeatherDay[]>([]);
    const [forecastOpen, setForecastOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);
    const animatedRef = useRef(false);

    const days = t('weather.days', {returnObjects: true}) as string[];

    const getIcon = (code: number) => {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '❄️';
        return '🌩️';
    };

    const getDesc = (code: number) => {
        if (code === 0) return t('weather.clear');
        if (code <= 3) return t('weather.cloudy');
        if (code <= 67) return t('weather.rain');
        if (code <= 77) return t('weather.snow');
        return t('weather.storm');
    };

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=49.047&longitude=23.514&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Kiev')
            .then(res => res.json())
            .then(data => {
                const code = data.current_weather.weathercode;
                setTemp(Math.round(data.current_weather.temperature));
                setDesc(getDesc(code));
                const daily = data.daily;
                const result: WeatherDay[] = daily.time.slice(0, 7).map((date: string, i: number) => ({
                    day: days[new Date(date).getDay()],
                    icon: getIcon(daily.weathercode[i]),
                    max: Math.round(daily.temperature_2m_max[i]),
                    min: Math.round(daily.temperature_2m_min[i]),
                }));
                setForecast(result);
            })
            .catch(err => console.error('Weather load error:', err));
    }, [t]);

    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animatedRef.current) {
                    animatedRef.current = true;
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.3}
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || temp === null) return;

        const delay = 600;
        const duration = 900;
        const steps = 30;
        const stepTime = duration / steps;
        const target = temp;

        const timeout = setTimeout(() => {
            let step = 0;
            const interval = setInterval(() => {
                step++;
                const progress = step / steps;
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayTemp(Math.round(eased * target));
                if (step >= steps) {
                    clearInterval(interval);
                    setDisplayTemp(target);
                }
            }, stepTime);
        }, delay);

        return () => clearTimeout(timeout);
    }, [visible, temp]);

    return (
        <div
            className={`${css.weatherBox} ${visible ? css.weatherBoxVisible : ''}`}
            ref={boxRef}
        >
            <div className={css.weatherCurrent}>
                <p className={css.weatherLabel}>
                    {t('weather.label')}<br/><strong>{t('weather.city')}</strong>
                </p>
                <div className={css.weatherIconWrap}>
                    <span className={`${css.weatherIcon} ${visible ? css.weatherIconVisible : ''}`}>
                        {forecast[0]?.icon}
                    </span>
                </div>
                <div className={css.weatherTempBlock}>
                    <span className={css.weatherTemp}>
                        {temp !== null ? `${displayTemp}°C` : '—'}
                    </span>
                    <p className={css.weatherDesc}>{desc}</p>
                </div>
                <button
                    className={css.forecastToggleBtn}
                    onClick={() => setForecastOpen(prev => !prev)}
                    aria-expanded={forecastOpen}
                >
                    {forecastOpen ? t('weather.hide') : t('weather.more')}
                </button>
            </div>

            <div className={css.weatherForecast}>
                {forecast.map((d, i) => (
                    <div
                        key={i}
                        className={css.weatherDay}
                        style={visible ? {animationDelay: `${320 + i * 60}ms`} : {}}
                    >
                        <p>{d.day}</p>
                        <span>{d.icon}</span>
                        <span className={css.weatherDayMax}>{d.max}°C</span>
                        <span className={css.weatherDayMin}>{d.min}°C</span>
                    </div>
                ))}
            </div>

            <div className={`${css.weatherForecastMobile} ${forecastOpen ? css.forecastMobileOpen : ''}`}>
                <div className={css.weatherForecastMobileInner}>
                    {forecast.map((d, i) => (
                        <div key={i} className={css.weatherDay}>
                            <p>{d.day}</p>
                            <span>{d.icon}</span>
                            <span className={css.weatherDayMax}>{d.max}°C</span>
                            <span className={css.weatherDayMin}>{d.min}°C</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export {WeatherComponent};
