const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Brands", "Products"],
  },
  {
    title: "Help Center",
    links: [
      {
        text: "LinkedIn",
        url: "https://www.linkedin.com/in/uzairqureshi0803/",
      },
      {
        text: "Netlify",
        url: "https://app.netlify.com/teams/08uzair/overview",
      },
      { text: "GitHub", url: "https://github.com/08Uzair" },
      { text: "Portfolio", url: "https://uzerqureshi.netlify.app/" },
    ],
  },
  {
    title: "Resources",
    links: ["H&M", "LV", "Gucci", "Dior"],
  },
  {
    title: "Products",
    links: ["Shirts", "T-Shirts", "Hoodies", "Formal Dresses"],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full mt-4">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <h2 className="mb-4 font-bold uppercase opacity-50 text-blue-gray-700">
                {title}
              </h2>
              <ul className="space-y-1">
                {links.map((link, linkKey) => {
                  const linkText = typeof link === "string" ? link : link.text;
                  const linkUrl = typeof link === "string" ? "#" : link.url;
                  return (
                    <li
                      key={linkKey}
                      className="font-normal text-blue-gray-700"
                    >
                      <a
                        href={linkUrl}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {linkText}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <p className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
            &copy; {currentYear} Uzer Nizamuddin Qureshi @ All Rights Reserved.
          </p>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <a
              href="https://www.linkedin.com/in/uzairqureshi0803/"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {/* linkedin */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
              </svg>
            </a>
            <a
              href="https://uzerqureshi.netlify.app/"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {/* github */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                ></path>
              </svg>
            </a>
            <a
              href="https://app.netlify.com/teams/08uzair/overview"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {/* Netlify */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M17.13 9.68 22 11.8v-.11c-.07-.24-.28-.45-.7-.87l-2-2-2.07.87zM12.2 7.24a1.31 1.31 0 0 1 .16.47l3 1.29a1.11 1.11 0 0 1 .29-.14l.48-3-2-2-1.95 3.3s0 .05.02.08zM10.61 7a1.1 1.1 0 0 1 1-.2h.05l2.16-3.34-.66-.66c-.42-.42-.63-.63-.87-.7a1 1 0 0 0-.63 0c-.24.07-.45.28-.87.7l-3 3c.31.14 2.5 1.06 2.78 1.19zm-3.12 5.29h.27a1.45 1.45 0 0 1 .29 0l2.38-3.68v-.06a1 1 0 0 1-.27-.95L9 7l-1.7-.73L5 8.61l2.51 3.66zm7.62-2.44v-.08a.59.59 0 0 1 0-.14l-2.86-1.27h-.05a1.05 1.05 0 0 1-.88.47h-.17s-.05 0-.06.05L8.73 12.5v.05l6.33-2.7s.05.02.05 0zm1.36-.91a.83.83 0 0 1 .26.19l2-.84-1.89-1.87-.4 2.47zm-2.29 5.54A.91.91 0 0 1 15 14v-.05l.54-3.37-.09-.08L9 13.15a2.76 2.76 0 0 1 .08.27zM2 11.95zm12.14 3.18L8.92 14v.06L13.47 21l.42-.43c.15-.92.71-4.33.78-4.72a.9.9 0 0 1-.53-.72zm1.65.32a.88.88 0 0 1-.36.27l-.64 3.94L18.43 16zm1.07-5.13a.07.07 0 0 0-.06 0 .92.92 0 0 1-.61.34v.06l-.55 3.4a.88.88 0 0 1 .34.62h.06l2.95.61 2.28-2.28a4.22 4.22 0 0 0 .65-.74zM8.3 14.59a1.27 1.27 0 0 1-.86 0l-1.22 1.9 4.69 4.68a2.68 2.68 0 0 0 .87.71 1 1 0 0 0 .63 0 1.86 1.86 0 0 0 .7-.54l-4.69-6.8zm4.71 6.82zm-6.62-7.82s.06 0 .06-.05 0 0-.06 0l-4.14-.86a7.07 7.07 0 0 0 .51.54l1.36 1.36 2.27-1zm.28-.66a1.05 1.05 0 0 1 .2-.27v-.06C6.1 11.4 5.3 10.24 4.5 9.07l-1.75 1.75c-.42.42-.63.63-.7.87A.75.75 0 0 0 2 12l4.67 1zm.17 1.33a.61.61 0 0 1-.07-.1L4.59 15l1.08 1.1 1.17-1.82s.01-.02 0-.02z"></path>
              </svg>
            </a>
            <a
              href="https://uzerqureshi.netlify.app/"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {/* Portfolio */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.5 3H5v18h4v-5h4.5c3.584 0 6.5-2.916 6.5-6.5S17.084 3 13.5 3zm0 9H9V7h4.5C14.879 7 16 8.121 16 9.5S14.879 12 13.5 12z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
