import '../styles/reset.scss';
import '../styles/styles.scss';
import '../styles/mixins.scss';

const classes = {
    opened: 'opened'
}

const header = document.querySelector('.header');
const menuBtn = document.querySelector('.header-menu__btn');
const menuLink = document.querySelectorAll('.menu-link');


const toggleMenu = () => {header.classList.toggle(classes.opened)};
const scrollToSection = (e) =>{
    e.preventDefaauit();
    const href = e.currentTarget.getAttribute('href');

    if(!href && !href.startsWith('#')) return;

    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;
    window.scrollTo({top, behavior: 'smooth'})
}



menuBtn.addEventListener('click', toggleMenu);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));