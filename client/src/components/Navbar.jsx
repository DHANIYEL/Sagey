import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronDown, Heart, Menu, ShoppingCart, User, X } from "lucide-react";
import "animate.css"; // Import Animate.css for animations
import SageLogo from "../assets/sage-logo.png";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    {
      title: "TOP",
      subcategories: ["Knee length tops", "Long tops (Maxi gowns)"],
    },
    {
      title: "ETHNIC WEARS",
      subcategories: ["Cotton wears", "Partywears", "Regular wears"],
    },
    {
      title: "HIJABS",
      subcategories: [],
    },
    {
      title: "CORD SETS",
      subcategories: [],
    },
  ];

  const handleNavigation = (category) => {
    const formattedCategory = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/collections?search=${formattedCategory}`);
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    const searchParam = searchParams.get("search");
    const sortParam = searchParams.get("sort");
    const page = searchParams.get("page");

    setCategory(categoryParam ? categoryParam.split(",") : []);
    setPrice(priceParam || "");
    setSort(sortParam || "");
    setPage(page || 1);
    setSearch(searchParam || "");
  }, []);

  const handleClick = (param, value) => {
    const params = new URLSearchParams(window.location.search);

    if (value === "" || (param === "page" && value === 1)) {
      params.delete(param);
      if (param === "price") {
        setPrice("");
      }
      if (param === "sort") {
        setSort("");
        params.delete("page");
        setPage(1);
      }
    } else {
      if (param === "category" && value) {
        let cat = params.get("category");
        if (!cat) {
          params.append("category", value);
          setCategory([value]);
        } else {
          let temp = cat.split(",");
          if (temp.length > 0) {
            if (temp.includes(value)) {
              temp = temp.filter((item) => item !== value);
            } else {
              temp.push(value);
            }

            if (temp.length > 0) {
              params.set("category", temp.join(","));
              setCategory(temp);
            } else {
              params.delete("category");
              setCategory([]);
            }
          } else {
            params.delete("category");
            setCategory([]);
          }
        }
      } else {
        params.set(param, value);
        if (param === "price") {
          setPrice(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "sort") {
          setSort(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "search") {
          params.delete("page");
          setPage(1);
        }
      }
    }

    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  const [showSideNavbar, setShowSideNavbar] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Search Bar */}
          <div className="flex items-center gap-8 flex-1">
            <a href="/" className="flex-shrink-0">
              <img src={SageLogo} width={90} height={90} alt="Logo" />
            </a>
            <div className="relative flex-1 max-w-lg hidden lg:block">
              <SearchBar
                handleClick={handleClick}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>

          {/* Right-side Buttons */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
            {/* Hidden on smaller screens */}
            <Link
              to="/register"
              className="px-4 py-2 bg-primary rounded-none text-sm font-medium text-white hover:bg-white hover:text-primary hover:border transition hidden sm:block"
            >
              SIGN IN / SIGN UP
            </Link>
            <Link to="/dashboard/wishlist" variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/cart" variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link to="/dashboard/profile" variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Link>
            <Menu
              className="h-5 w-5 hidden max-lg:block cursor-pointer"
              onClick={() => setShowSideNavbar(true)}
            />
          </div>
        </div>

        {/* Sidebar */}
        {showSideNavbar && (
          <div
            className={`fixed top-0 right-0 w-1/2 h-screen bg-primary z-50 animate__animated ${
              showSideNavbar ? "animate__fadeInRight" : "animate__fadeOutRight"
            }`}
          >
            <X
              className="absolute top-4 left-4 h-6 w-6 text-white cursor-pointer"
              onClick={() => setShowSideNavbar(false)}
            />
            <div className="relative flex-1 flex justify-center items-center max-w-xl mx-auto mt-12 w-3/4">
              <SearchBar
                handleClick={handleClick}
                search={search}
                setSearch={setSearch}
              />
            </div>
            <nav className="mt-4 py-3 rounded-md">
              <ul className="flex flex-col px-4">
                {/* Add "SIGN IN / SIGN UP" button in mobile menu */}
                <li className="py-2">
                  <Link
                    to="/register"
                    className="block text-sm font-medium text-white bg-primary px-4 py-2 rounded-md hover:bg-white hover:text-primary"
                    onClick={() => setShowSideNavbar(false)}
                  >
                    SIGN IN / SIGN UP
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <li
                    key={category.title}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center justify-between py-4">
                      <span
                        className="text-sm font-medium text-white cursor-pointer"
                        onClick={() => handleNavigation(category.title)}
                      >
                        {category.title}
                      </span>
                      {category.subcategories.length > 0 && (
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === index ? null : index
                            )
                          }
                          className="p-1"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200 text-white",
                              activeDropdown === index ? "rotate-180" : ""
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {category.subcategories.length > 0 && (
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-200",
                          activeDropdown === index
                            ? "max-h-[500px] opacity-100 mb-4"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="flex flex-col gap-2 pl-4">
                          {category.subcategories.map((sub, subIndex) => (
                            <button
                              key={`${index}-${subIndex}`}
                              onClick={() => handleNavigation(sub)}
                              className="text-left text-sm text-white hover:text-gray-900 py-1"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Conditional rendering for the nav only on "/" route */}
      </div>
      {window.location.pathname === "/" && (
        <div className="w-full flex justify-center items-center relative">
          <nav className="mt-4 hidden lg:block py-3  w-[100vw] bg-primary">
            <ul className="flex gap-8 px-4 justify-center items-center">
              {categories.map((category, index) => (
                <li
                  key={category.title}
                  className="relative text-sm font-medium text-white hover:text-gray-300 cursor-pointer"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span onClick={() => handleNavigation(category.title)}>
                    {category.title}
                  </span>
                  {category.subcategories.length > 0 && (
                    <div
                      className={cn(
                        "absolute top-full left-0 bg-white text-gray-900 rounded-sm mt-2 shadow-lg w-56 z-50",
                        activeDropdown === index ? "block" : "hidden"
                      )}
                    >
                      <div className="py-2">
                        {category.subcategories.map((sub, subIndex) => (
                          <button
                            key={`${index}-${subIndex}`}
                            onClick={() => handleNavigation(sub)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
