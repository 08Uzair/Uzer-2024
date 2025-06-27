const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Brands", "Products"],
  },
  {
    title: "Help Center",
    links: [
      { text: "LinkedIn", url: "https://www.linkedin.com/in/uzairqureshi0803/" },
      { text: "Netlify", url: "https://app.netlify.com/teams/08uzair/overview" },
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
    <footer className="w-full bg-gray-50 text-gray-700 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-200 pb-10">
          {SITEMAP.map(({ title, links }, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, idx) => {
                  const linkText = typeof link === "string" ? link : link.text;
                  const linkUrl = typeof link === "string" ? "#" : link.url;
                  return (
                    <li key={idx}>
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-sky-500 transition-colors duration-200 text-sm block"
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

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-center sm:text-left text-gray-500">
            &copy; {currentYear} Uzer Nizamuddin Qureshi. All Rights Reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/uzairqureshi0803/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition-transform hover:scale-110"
            >
              <i className="fa-brands fa-linkedin fa-lg"></i>
            </a>
            <a
              href="https://github.com/08Uzair"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition-transform hover:scale-110"
            >
              <i className="fa-brands fa-github fa-lg"></i>
            </a>
            <a
              href="https://app.netlify.com/teams/08uzair/overview"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition-transform hover:scale-110"
            >
              <i className="fa-brands fa-netlify fa-lg"></i>
            </a>
            <a
              href="https://uzerqureshi.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition-transform hover:scale-110"
            >
              <i className="fa-solid fa-user fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
