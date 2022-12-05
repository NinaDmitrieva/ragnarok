import 'swiper/swiper.min.css';
import { languages } from './languages';
import '../styles/reset.scss';
import '../styles/styles.scss';

import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

let isPlay = false;
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active',
};

const checkboxes = {
    requirements: ["minimum", "recommended"],
    version: ["standart", "limited"],
}

const checkbox = document.querySelectorAll('.checkbox');
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.header-menu__btn');
const menuLink = document.querySelectorAll('.menu-link');
const video = document.getElementById('video');
const videoBtn = document.querySelector('.video-btn');
const faqItem = document.querySelectorAll('.faq-item');
const sections = document.querySelectorAll('.section');
const language = document.querySelectorAll('.language');


const toggleMenu = () => { header.classList.toggle(classes.opened) };
const scrollToSection = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    if (!href && !href.startsWith('#')) return;

    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;
    window.scrollTo({ top, behavior: 'smooth' })
}

const formatValue = (value) => value < 10 ? `0${value}` : value;
const getTimerValues = (diff) => ({
    seconds: (diff / 1000) % 60,
    minutes: (diff / (1000 * 60)) % 60,
    hours: (diff / (1000 * 60 * 60)) % 24,
    days: (diff / (1000 * 3600 * 24)) % 30, //возьмем, что в среднем 30
});

const starTimer = (date) => {
    setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime()

        Object.entries(getTimerValues(diff)).forEach(([key, value]) => {
            const getTimerValue = document.getElementById(key);
            getTimerValue.innerText = formatValue(Math.floor(value));
        });
    }, 1000);
};

const hendelOpenVideo = ({ target }) => {
    const info = target.parentElement;
    isPlay = !isPlay;
    info.classList.toggle(classes.hidden, isPlay)
    target.innerText = isPlay ? 'Pause' : 'Play';
    isPlay ? video.play() : video.pause();
};

const handelCheckbox = ({ currentTarget: { checked, name } }) => {
    const { active } = classes;
    const value = checkboxes[name][Number(checked)]; //раз в массиве 2 значения, преобразуем checked
    const list = document.getElementById(value);
    const tabs = document.querySelectorAll(`[data-${name}]`);
    const siblings = list.parentElement.children;

    for (const item of siblings) item.classList.remove(active);
    for (const tab of tabs) {
        tab.classList.remove(active);
        tab.dataset[name] === value && tab.classList.add(active);
    }

    list.classList.add(active);

    console.log(value);
};

const initSlider = () => {
    new Swiper('.swiper', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        initialSlide: 2,
        navigation: {
            prevEl: '.swiper-btn-prev',
            nextEl: '.swiper-btn-next',
        }
    })
};

const handelFaqItem = ({ currentTarget: target }) => {
    target.classList.toggle(classes.opened);
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector('p').clientHeight;
    const content = target.querySelector('.faq-item__content');

    content.style.height = `${isOpened ? height : 0}px`
};

const hendelScroll = () => {
    const { scrollY: y, innerHeight: h } = window;
    sections.forEach((section) => {
        if (y > section.offsetTop - h / 1.5)
            section.classList.remove(classes.hidden);
    });
};

const setText = () => {
    const lang = localStorage.getItem('lang') || 'en';
    const content = languages[lang];


    Object.entries(content).forEach(([key, value]) => {
        const items = document.querySelectorAll(`[data-text='${key}']`)
        items.forEach((item) => (item.innerText = value));
    });

};

const handelToggleLanguage = ({ target }) => {
    const { lang } = target.dataset;

    if (!lang) return;
    localStorage.setItem('lang', lang);
    setText()
}

setText();
initSlider();
starTimer('December 31, 2022 00:00:00');
window.addEventListener('scroll', hendelScroll);
menuBtn.addEventListener('click', toggleMenu);
videoBtn.addEventListener('click', hendelOpenVideo);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));
checkbox.forEach((box) => box.addEventListener('click', handelCheckbox));
faqItem.forEach((item) => item.addEventListener('click', handelFaqItem));
language.forEach((lang) => lang.addEventListener('click', handelToggleLanguage));
