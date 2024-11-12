import Header from "../components/Header";
import BigCard from "../components/BigCard";
import image_1 from "../assests/images/image_1.jpg";
import image_2 from "../assests/images/image_2.jpg";
import image_3 from "../assests/images/image_3.jpg";
// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col pt-11 px-20 gap-10">
        <BigCard src={image_1} />
        <BigCard src={image_2} />
        <BigCard src={image_3} />
      </main>
    </div>
  );
}

export default HomePage;
