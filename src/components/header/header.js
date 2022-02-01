import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={'main-header'}>
            <NavLink to={"/"}> Home </NavLink>
            <NavLink to={"/events"}> Events </NavLink>
            <NavLink to={"/profile"}> Profile </NavLink>
        </div>
    )
}
export default Header;