import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { GrCart } from "react-icons/gr";



function Header() {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId")

    const links = [
        {title: "Home", to: "/"},
        {title: "Shop", to: "/products"},
        {title: "Settings", to: "/settings"},
        {title: "Cart", to: "/cart"}   
    ];

    const renderedLinks = links.map((link) => {
        return <Link className=" mr-3 font-serif text-lg text-[#874d7d] font-medium hover:bg-purple-300" key={link.title} to={link.to}>{link.title}</Link>
    })

    // handle logout:
    const handleLogOut = () => {
        sessionStorage.removeItem("userId");
        navigate("/login")
    }

    // handle click on cart icon:
    const handleClickCartIcon = () => {
        console.log("cart");
        if(userId) {
            navigate("/cart");
        }else {
            navigate("/")
        }
    }

    // We can do it by conditional rendering also...
    const btns = userId? ((<div className="flex w-50 justify-center items-center gap-3"> 
    <Button onClick={handleLogOut} primary rounded>Log Out</Button>
    </div>)) :(<div className="flex w-50 justify-center items-center gap-3">
    <Button onClick={() => navigate("/signup")} primary rounded className="py-1 px-2 font-semibold">
        Sign Up
    </Button>
    <Button onClick={() => navigate("/login")} primary rounded className="py-1 px-2 font-semibold"> 
        Sign In
    </Button> 
    </div>);


    return(
        <header className="w-full flex flex-col py-1 px-6 shadow-sm">
            <div className="flex justify-between w-full items-center">
                <div className="flex w-28">
                    <img src="https://urbanthreads.com/themes/default/assets/images/logos/new/EL_horizontal_blue.svg" alt="pic1" className="w-full" />
                    <img src="https://urbanthreads.com/themes/default/assets/images/logos/new/CG_horizontal_green.svg" alt="pic2" className="w-full" />
                </div>
                {btns}
            </div>
                <hr className="w-full bg-purple-800 h-0.5" />
            <div className="w-full flex justify-between items-center pt-3 pr-16">
                <div className="w-48">
                    <img src='https://urbanthreads.com/themes/default/assets/images/logos/employee-owned/UT_EmployeeOwned_Logo.png' alt="Logo" className="w-full"/>
                </div>
                <div className="flex flex-col justify-center item-center">
                <GrCart onClick={handleClickCartIcon} className="mx-auto text-2xl cursor-pointer"/>
                <p className="font-thin">Your cart</p>
                </div>
            </div>
            <div className="flex justify-start items-center bg-[#f3edf7] py-2 px-5">
                {renderedLinks}
            </div>
        </header>
    )
}

export default Header;

/*
<div className="flex justify-center items-center w-1/3">
                <input placeholder="Search..." type="text" className="border border-black-200 w-5/6 p-2 rounded-l-lg" />
                <button className="flex items-center justify-center border border-purple-600 bg-[#f3f0f8] outline-none py-2 px-4 rounded-r-lg">Search</button>
                </div>
*/