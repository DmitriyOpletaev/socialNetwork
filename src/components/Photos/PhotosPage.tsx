import m from './photos.module.css'
import photo1 from '../../assets/images/CAT.jpg'
import photo2 from '../../assets/images/photos/sadasd.png'
import photo3 from '../../assets/images/photos/2.jpg'
import photo4 from '../../assets/images/photos/3.jpg'
import photo5 from '../../assets/images/photos/1.jpg'
import photo6 from '../../assets/images/photos/5.jpg'
import photo7 from '../../assets/images/photos/user.jpg'
import {Image} from "antd";



export const PhotosPage = () => {


    return (
        <div className={m.wrapper}>
            <Image.PreviewGroup>
                <Image src={photo1}/>
                <Image src={photo2}/>
                <Image src={photo3}/>
                <Image src={photo4}/>
                <Image src={photo5}/>
                <Image src={photo6}/>
                <Image src={photo7}/>
            </Image.PreviewGroup>

        </div>
    )
}