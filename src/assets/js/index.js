import '../styles/reset.scss';
import '../styles/styles.scss';
import '../styles/mixins.scss';

const classes = {
    opened: 'opened'
}

const header = document.querySelector('.header');
const menuBtn = document.querySelector('.header-menu__btn');
const menuLink = document.querySelectorAll('.menu-link');


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
           // console.log('key', value)
           const getTimerValue = document.getElementById(key);
            getTimerValue.innerText = formatValue(Math.floor(value));
        });
    }, 1000);
    //const diff = new Date(date).getTime() - new Date().getTime();
    //console.log(getTimerValues(diff))
}

starTimer('Novemder 9, 2023 00:00:00');
menuBtn.addEventListener('click', toggleMenu);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));