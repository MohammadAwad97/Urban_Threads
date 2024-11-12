import Button from "../components/Button"
import { Link } from "react-router-dom"

function PageNotFound() {
    return(
        <div className="flex justify-center items-center h-[100vh] w-full">
            <div className="w-[40%] h-[40%] border shadow-xl flex flex-col justify-center items-center p-6 gap-6 rounded-lg">
            <h1 className="font-sans font-bold text-2xl">Page Not Found</h1>
            <Button primary className="font-semibold">
                <Link to='/'>Go to home page</Link>
            </Button>
            </div>
        </div>
    )
}; 
export default PageNotFound;