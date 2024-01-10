import gal1 from './images/grid/1.jpg'
import gal2 from './images/grid/2.jpg'
import gal3 from './images/grid/3.jpg'
import gal4 from './images/grid/4.jpg'
import gal5 from './images/grid/5.jpg'
import gal6 from './images/grid/6.jpg'
import gal7 from './images/grid/7.jpg'
import gal8 from './images/grid/8.jpg'
import gal9 from './images/grid/9.jpg'
import gal10 from './images/grid/10.jpg'

const images = [{   bg:gal1,
                    heading : "School supplies from 25$",
                    shop : "shop now" },

                    {bg:gal2,
                    heading : "College prep",
                    shop : "shop now",
                    dev : "Delivery as fast as today" },

                    {bg:gal3,
                    heading : "Dorm room chic",
                    shop : "shop decor" },

                    {bg:gal4,
                    heading : "School styles for less",
                    shop : "shop kid's fashion" },

                    {bg:gal5,
                    heading : "Sports equipment FTW",
                    shop : "shop now" },

                    {bg:gal6,
                    heading : "Up to 65% off",
                    shop : "shop now" },

                    {bg:gal7,
                    heading : "tech for the semester from $10",
                    shop : "shop now" },

                    {bg:gal8,
                    heading : "Leader of the pack",
                    shop : "shop backpacks" },

                    {bg:gal9,
                    heading : "Members get free shipping with no order minimum!",
                    shop : "Join Walmart+" },

                    {bg:gal10,
                    heading : "Campus - ready looks",
                    shop : "shop now" }]
function Gallery(){
    return<>
        <div className="gal-con">
           { images.map((image,i)=><div style={{ backgroundImage: `url(${image.bg})` }}  className={'img img'+(i+1)} ><p className="delivery">{image.dev}</p> <p>{image.heading}</p><a>{image.shop}</a></div>)}
        </div>
    </>
}

export default Gallery;

