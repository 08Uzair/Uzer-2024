import React from "react";

const Top = () => {
  const products = [
    {
      image:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1750943144/photo-1661850658031-15106e04e497_eosem6.avif",
      name: "H&M",
      description: '" THE JOY OF DRESSING IS AN ART "',
    },
    {
      image:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1750943168/photo-1596622723231-b20320c7346b_dsctbe.avif",
      name: "LV",
      description: '"STYLE IS A WAY TO SAY WHO YOU ARE." ',
    },
    {
      image:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1750943196/free-photo-of-two-white-statues-of-giraffes_nm8rex.jpg",
      name: "Dior",
      description: '"ELEGANCE IS ALWAYS IN STYLE."',
    },
  ];

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-12 mt-12 text-center">
        OUR BRANDS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
        {products.map((item, index) => (
          <div
            key={index}
            className="relative h-80 sm:h-96 md:h-[32rem] w-full rounded-2xl overflow-hidden shadow-lg group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-end p-6 md:p-8 text-center">
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2 !dior">
                {item.name}
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Top;
