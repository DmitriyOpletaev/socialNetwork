import m from './photos.module.css'
import photo1 from '../../assets/images/CAT.jpg'
import photo2 from '../../assets/images/photos/sadasd.png'
import photo3 from '../../assets/images/photos/2.jpg'
import photo4 from '../../assets/images/photos/3.jpg'
import photo5 from '../../assets/images/photos/1.jpg'
import photo6 from '../../assets/images/photos/5.jpg'
import photo7 from '../../assets/images/photos/user.jpg'

export const PhotosPage=()=>{
    return(
        <div className={m.wrapper}>
            <div className={m.photos}><img src={photo1}/></div>
            <div className={m.photos}><img src={photo2}/></div>
            <div className={m.photos}><img src={photo3}/></div>
            <div className={m.photos}><img src={photo4}/></div>
            <div className={m.photos}><img src={photo5}/></div>
            <div className={m.photos}><img src={photo6}/></div>
            <div className={m.photos}><img src={photo7}/></div>
        </div>
    )
}