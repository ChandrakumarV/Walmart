import actimg1 from './images/fields/gal2 img 01.jpg'
import actimg2 from './images/fields/gal2 img 02.jpg'
import actimg3 from './images/fields/gal2 img 03.jpg'
import actimg4 from './images/fields/gal2 img 04.jpg'
import actimg5 from './images/fields/gal2 img 05.jpg'
import actimg6 from './images/fields/gal2 img 06.jpg'
import actimg7 from './images/fields/gal2 img 07.jpg'
import actimg8 from './images/fields/gal2 img 08.jpg'
import actimg9 from './images/fields/gal2 img 09.jpg'
import actimg10 from './images/fields/gal2 img 10.jpg'
import actimg11 from './images/fields/gal2 img 11.jpg'
import actimg12 from './images/fields/gal2 img 03.jpg'

const actionitem = [
  { img:actimg1, name: "Home" },
  { img:actimg2, name: "Electronics" },
  { img:actimg3, name: "Sports" },
  { img:actimg4, name: "Toys" },
  { img:actimg5, name: "Grocery" },
  { img:actimg6, name: "Fashion" },
  { img:actimg7, name: "Auto & tires" },
  { img:actimg8, name: "Health & Wellness" },
  { img:actimg9, name: "Household" },
  { img:actimg10, name: "Baby" },
  { img:actimg11, name: "Patio and garden" },
  { img:actimg12, name: "Sports" }
];
export default function Actioncart() {
  return (
    <div className="action-cart">
      <div className="action-con">
        <p>Get it all right here</p>
        <ul>
          {actionitem.map((item, i) => (
            <li key={i}>
              <img src={item.img} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
