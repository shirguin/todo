const MenuItem = ({menuItem}) => {

    return(
        <li>
            <a href={menuItem.hrefItem}>{menuItem.nameItem}</a>
        </li>
    )
}

const Menu = ({menuItems}) =>{

    return(
        <div className="menu">
            <ul>
                {menuItems.map((menuItem_) => <MenuItem menuItem = {menuItem_} />)}
            </ul>
        </div>
    )
}

export default Menu