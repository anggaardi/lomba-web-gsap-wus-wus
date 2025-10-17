const head = document.head;

const links = [
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.css",
  },
  { rel: "stylesheet", href: "style.css" },

  { rel: "stylesheet", href: "navbar/navbar.css" },
  { rel: "stylesheet", href: "./style/Home/load.css" },

  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

links.forEach((linkData) => {
  const link = document.createElement("link");
  Object.assign(link, linkData);
  head.appendChild(link);
});




head.appendChild(script);
