import { useState } from "react";

import gal1 from './images/grid2/gal2-grid-1.jpg'
import gal2 from './images/grid2/gal2-grid-2.jpg'
import gal3 from './images/grid2/gal2-grid-3.jpg'
import gal4 from './images/grid2/gal2-grid-4.jpg'
import gal5 from './images/grid2/gal2-grid-5.jpg'

export default function Gallery2() {
  return (
    <div className="gallery2">
      <div className="gal-grid">
        {images.map((items, i) => (
          <div
            className={`gal-grid-item gird-item-${i + 1}`}
            style={{ backgroundImage: `url(${items.bg})` }}
          >
            <p>{items.heading}</p>
            <a>{items.shop}</a>
          </div>
        ))}
      </div>
      
      <Readmore maxwords={40} >
        "But I must explain to you how all this mistaken idea of denouncing
        pleasure and praising pain was born and I will give you a complete
        account of the system, and expound the actual teachings of the great
        explorer of the truth, the master-builder of human happiness. No one
        rejects, dislikes, or avoids pleasure itself, because it is pleasure,
        but because those who do not know how to pursue pleasure rationally
        encounter consequences that are extremely painful. Nor again is there
        anyone who loves or pursues or desires to obtain pain of itself, because
        it is pain, but because occasionally circumstances occur in which toil
        and pain can procure him some great pleasure. To take a trivial example,
        which of us ever undertakes laborious physical exercise, except to
        obtain some advantage from it? But who has any right to find fault with
        a man who chooses to enjoy a pleasure that has no annoying consequences,
        or one who avoids a pain that produces no resultant pleasure?"
      </Readmore>
    </div>
  );
}

const images = [
  {
    bg: gal1,
    heading: "Fast fun, priced right",
    shop: "shop toys",
  },

  {
    bg: gal2,
    heading: "Arts & crafts for kids",
    shop: "shop now",
  },

  {
    bg: gal3,
    heading: "Ready,set,play!",
    shop: "shop toys",
  },

  {
    bg: gal4,
    heading: "Welcome to Barbie Land",
    shop: "shop now",
  },

  {
    bg: gal5,
    heading: "Scooters form $250",
    shop: "shop now",
  },
];

function Readmore({
  children,
  cllosapetext = "Show Less",
  expandtext = "Show More",
  maxwords = 30,
  btncolor = "#006ed5",
}) {
  const [isExpand, setIsExpand] = useState();
  return (
    <div className="readmoretext">
      {isExpand
        ? children
        : children.split(" ").slice(0, maxwords).join(" ").toString() + " ..."}
      <a onClick={() => setIsExpand((i) => !i)}  >
        {isExpand ? cllosapetext : expandtext}
      </a>
    </div>
  );
}
