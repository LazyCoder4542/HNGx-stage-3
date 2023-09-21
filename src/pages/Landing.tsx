import { Link } from "react-router-dom"


import styles from "./Landing.module.css"
import image1 from "./../assets/images/snake.jpeg"
import image2 from "./../assets/images/Leopard_Portrait.jpeg"
import image3 from "./../assets/images/hmmm.jpeg"
import image4 from "./../assets/images/stallion.jpeg"
import image5 from "./../assets/images/lobster.jpeg"
import image6 from "./../assets/images/big_cat.jpeg"
import image7 from "./../assets/images/caart.jpeg"
function Landing() {
  return (
    <div className={styles.container}>
      <section id={styles.intro}>
        <header>
          <h1>
            Explore wonders of Nature
          </h1>
          <p className={styles.tag_line}>
            View and Download Galleries of different species of animals...
          </p>
          <Link to="/join">
            <button className="btn btn-primary rounded">
              Sign up for Free!
            </button>
          </Link>
        </header>
        <div  className={styles.float_img}>
          <img src={image1} alt="" />
        </div>
        <div  className={styles.float_img}>
          <img src={image2} alt="" />
        </div>
        <div  className={styles.float_img}>
          <img src={image3} alt="" />
        </div>
        <div  className={styles.float_img}>
          <img src={image4} alt="" />
        </div>
        <div  className={styles.float_img}>
          <img src={image5} alt="" />
        </div>
        <div  className={styles.float_img}>
          <img src={image6} alt="" />
        </div>
      </section>
    </div>
  );
}

export default Landing;