export const categories = [
  { id: "html-css", label: "HTML & CSS" },
  { id: "html-css-js", label: "HTML, CSS & JS" },
  { id: "react", label: "React.js" },
];

export const projects = [
  /* ---------- HTML & CSS (4 projects) ---------- */
  {
    id: 1,
    category: "html-css",
    title: "Anime Website",
    desc: "A responsive anime-themed website built using HTML and CSS, designed with a visually engaging layout and mobile-friendly interface.",
    tech: ["HTML", "CSS",],
    image: "/projects-img/anime-site.png", // jaise "/projects/restaurant.png"
    live: "https://anime-landingpage.netlify.app/", // live link
  },
  {
    id: 2,
    category: "html-css",
    title: "Restaurant Landing Page",
    desc: "A responsive restaurant landing page built with HTML and CSS, featuring a clean visual layout designed to provide an attractive browsing experience across devices.",
    tech: ["HTML", "CSS"],
    image: "/projects-img/resturant-site.png",
    live: "https://resturant-page1.netlify.app/",
  },
  {
    id: 3,
    category: "html-css",
    title: "Barber Shop Landing Page",
    desc: "A modern and responsive barber shop landing page designed with HTML and CSS, featuring a clean layout and mobile-friendly presentation..",
    tech: ["HTML", "CSS",],
    image: "/projects-img/barbershop.png",
    live: "https://barbershop-site3.netlify.app/",
  },
  {
    id: 4,
    category: "html-css",
    title: "Apna School Landing Page",
    desc: "A responsive school landing page built with HTML and CSS, presenting educational content through a clean and mobile-friendly interface.",
    tech: ["HTML", "CSS", ],
    image: "/projects-img/apnaschool.png",
    live: "https://apna-school1.netlify.app/",
  },

  /* ---------- HTML, CSS & JS (4 projects) ---------- */
  {
    id: 5,
    category: "html-css-js",
    title: "LMS & Student Portal",
    desc: "A learning management portal where users can sign up, upload a profile picture, select courses, receive a digital student ID card, download the ID card as a PDF, and take quizzes based on their selected course.",
    tech: ["HTML", "CSS", "JavaScript", "firebase","firebase-auth","realtime-database","claudinary"],
    image: "/projects-img/lmsportal.png",
    live: "https://w90236617-ux.github.io/LMSsite/",
  },
  {
    id: 6,
    category: "html-css-js",
    title: " API Integration - User Data Fetching",
    desc: "An API integration project that fetches user data from an external API and dynamically displays the retrieved information through a responsive web interface..",
    tech: ["HTML", "CSS", "JavaScript","API"],
    image: "/projects-img/API-integration.png",
    live: "https://w90236617-ux.github.io/api-integration/",
  },
  {
    id: 7,
    category: "html-css-js",
    title: "Contact List - Firebase Realtime Database",
    desc: "Created a contact management application that stores user contact data in Firebase Realtime Database for persistent data management.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase-realtime-databse"],
    image: "/projects-img/contact-list.png",
    live: "https://w90236617-ux.github.io/conatct-list/",
  },
  {
    id: 8,
    category: "html-css-js",
    title: "login-page",
    desc: "A responsive authentication interface featuring login and signup screens with interactive JavaScript functionality and a clean modern layout.",
    tech: ["HTML", "CSS", "JavaScript",],
    image: "/projects-img/signup-page.png",
    live: "https://static-signup-page.netlify.app/",
  },

  /* ---------- React.js (3 projects) ---------- */
  {
    id: 9,
    category: "react",
    title: "Users API call with Routing",
    desc: "A React.js project that demonstrates API integration with React Router. The application fetches user data from an API and provides dedicated routes to navigate between users and view their details. It showcases dynamic routing, API data handling, React components, and a clean user-focused interface.",
    tech: ["React", "React-Router","API"],
    image: "/projects-img/users-api.png",
    live: "https://user-api-routing.netlify.app/",
  },
  {
    id: 10,
    category: "react",
    title: "Products API call",
    desc: "A responsive React.js application built to demonstrate API integration using Axios. The project fetches and displays data dynamically from an API, with pagination implemented for efficient data browsing. It also demonstrates React state management, asynchronous API handling, and a clean user-friendly interface.",
    tech: ["React", "States","Axios", "API"],
    image: "/projects-img/products-api.png",
    live: "https://api-call-react33.netlify.app/",
  },
  {
    id: 11,
    category: "react",
    title: "Dice game",
    desc: "An interactive Dice Game built with HTML, CSS, and JavaScript. Players can roll the dice and get random results, with game logic handled dynamically using JavaScript. The project demonstrates DOM manipulation, event handling, random number generation, and interactive UI design.",
    tech: ["React", "States",],
    image: "/projects-img/dice-game.png",
    live: "https://dicegame231.netlify.app/",
  },
];