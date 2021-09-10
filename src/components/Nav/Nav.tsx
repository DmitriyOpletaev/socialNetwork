import n from './Nav.module.css';
import {NavLink} from "react-router-dom";

function Nav() {
    return (
        <nav className={n.nav}>
            <div className={n.Link_Container}>
                <NavLink className={n.link} activeClassName={n.active} to="/profile/">
                    Profile
                </NavLink>
            </div>
            <div className={n.Link_Container}>
                <NavLink className={n.link} activeClassName={n.active} to="/users">
                    Users
                </NavLink>
            </div>
            <div className={n.Link_Container}>
                <NavLink className={n.link} activeClassName={n.active} to="/dialogs">
                    Dialogs
                </NavLink>
            </div>
            <div className={n.Link_Container}>
                <NavLink className={n.link} activeClassName={n.active} to="/groups">
                    Groups
                </NavLink>
            </div>
            <div className={n.Link_Container}>
                <NavLink className={n.link} activeClassName={n.active} to="/news">
                    News
                </NavLink>
            </div>
            <div className={n.Link_Container}>
                <NavLink className={n.link} activeClassName={n.active} to="/music">
                    Music
                </NavLink>
            </div>
        </nav>
    )
}

export default Nav;