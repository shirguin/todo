import React from "react";
import {Link} from "react-router-dom";

const MenuItem = ({menuItem}) => {

    return(
        <li>
            <Link to={menuItem.hrefItem}>{menuItem.nameItem}</Link>
        </li>
    )
}

const Menu = ({menuItems}) =>{

    return(
        <div className="menu">
            <nav>
                {menuItems.map((menuItem_) => <MenuItem menuItem = {menuItem_} />)}
            </nav>
        </div>
    )
}

export default Menu