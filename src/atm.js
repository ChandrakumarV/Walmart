import atmimg from './images/atm.png'
export default function Atm() {
  return (
    <div className="atm-con">
      <div className="atm">
        <img src={atmimg} />
        <p><span>Earn 5% cash back on Walmart.com.</span> See if you’re pre-approved with no credit risk. <a>Learn how</a></p>
      </div>
    </div>
  );
}
