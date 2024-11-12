function CategoriesList({ onChange, filterBySearch }) {
  // This data will come from the db:
  const categories = [
    {
      label: "All",
      url: "https://cdn-icons-png.flaticon.com/128/443/443635.png",
    },
    {
      label: "Men",
      url: "https://cdn-icons-png.flaticon.com/128/522/522399.png",
    },
    {
      label: "Women",
      url: "https://cdn-icons-png.flaticon.com/128/2922/2922585.png",
    },
    {
      label: "Accessories",
      url: "https://cdn-icons-png.flaticon.com/128/775/775385.png",
    },
    {
      label: "Shoes",
      url: "https://cdn-icons-png.flaticon.com/128/500/500225.png",
    },
    {
      label: "Tops",
      url: "https://cdn-icons-png.flaticon.com/128/7394/7394924.png",
    },
    {
      label: "Sleepwear",
      url: "https://cdn-icons-png.flaticon.com/128/11205/11205889.png",
    },
    {
      label: "Lingeries",
      url: "https://cdn-icons-png.flaticon.com/128/9256/9256908.png",
    },
  ];

  const renderedCategories = categories.map((category) => {
    return (
      <div
        key={category.label}
        onClick={() => onChange(category.label)}
        className="flex flex-col justify-center items-center px-5 cursor-pointer text-sm text-[gray] hover:border-b-[2px] hover:border-b-[#a067d1]"
      >
        <img className="size-6" src={category.url} alt="jeans" />
        {category.label}
      </div>
    );
  });

  // handle search:
  const handleKeyUp = (e) => {
    filterBySearch(e.target.value);
  };

  return (
    <div className="flex justify-around w-full mt-4 border-b-[1px] pb-1">
      <div className="w-[60%] flex justify-start items-center">
        {renderedCategories}
      </div>
      <div className="flex justify-center items-center w-1/3">
        <input
          onKeyUp={handleKeyUp}
          placeholder="Search..."
          type="text"
          className="border border-black-200 w-5/6 p-2 rounded-l-lg placeholder-[#a067d1]"
        />
      </div>
    </div>
  );
}

export default CategoriesList;

/*
<button className="flex items-center justify-center border border-purple-600 bg-[#f3f0f8] outline-none py-2 px-4 rounded-r-lg">Search</button>
*/
