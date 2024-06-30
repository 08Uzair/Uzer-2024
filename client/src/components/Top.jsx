import React from "react";

const Top = () => {
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1661850658031-15106e04e497?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fEglMjZNfGVufDB8fDB8fHww",
      name: "H&M",
      description: '" THE JOY OF DRESSING IS AN ART "',
      avatar:
        "https://tse2.mm.bing.net/th?id=OIP.3NWazcNdYtgi0aTpF-gsdwHaFj&pid=Api&P=0&h=220",
    },
    {
      image:
        "https://images.unsplash.com/photo-1596622723231-b20320c7346b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxvdWlzJTIwdnVpdHRvbnxlbnwwfHwwfHx8MA%3D%3D",
      name: "LV",
      description:
        '"Style is a way to say who you are without having to speak." ',
      avatar:
        "https://tse4.mm.bing.net/th?id=OIP.8T3i2a-RgijTC9gRDCdXygHaEU&pid=Api&P=0&h=220",
    },
    {
      image:
        "https://images.pexels.com/photos/18785368/pexels-photo-18785368/free-photo-of-two-white-statues-of-giraffes.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dior",
      description: '"Elegance is always in style."',
      avatar:
        "https://tse1.mm.bing.net/th?id=OIP.Y3-DU4PKkOZLpVtXgRKtLgAAAA&pid=Api&P=0&h=220",
    },
  ];

  return (
    <>
      <h1 className="text-3xl	font-bold  mb-12 mt-12 text-center w-full ">
        OUR BRANDS
      </h1>
      <div className="flex item-center justify-center">
        {products.map((item, index) => (
          <div
            key={index}
            className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-12 rounded-2xl"
          >
            <div
              className="absolute inset-0 m-0 h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-bg-black-10" />
            </div>
            <div className="relative py-14 px-6 md:px-12">
              <h2 className="mb-6 text-white font-medium leading-[1.5] text-2xl md:text-3xl">
                {item.name}
              </h2>
              <h5 className="mb-4 text-gray-400 text-lg">{item.description}</h5>
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-white overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.avatar}
                  alt={item.name}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Top;
