import React, { useState, forwardRef } from 'react';
import { List, ListItem, Collapse, Button, Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import menuItems from './sideBarItems';
import { NavLink as RouterLink } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import useStyles from './menuBarStyle';
const hanleInputBox = (e) => {
    if (e.target.checked) {

    }

}

const MenuBar = ({handleinput,calv1,calv2,date,handleCountry,hangleCategory,handleHost},props) => {
    const [menu, setMenu] = useState({});
    const { className, ...rest } = props;
    const classes = useStyles();
    const handleClick = (item) => {
        let newData = { ...menu, [item]: !menu[item] };
        setMenu(newData);
    }

    const handleMenu = (children, level = 0) => {
        return children.map(({ children, name, links }, index) => {
            if (!children) {
                return (
                    <List component="div" disablePadding key={index}>
                        <ListItem
                            className={classes.item}
                            disableGutters
                            style={{ padding: "0px" }}
                            key={index}
                        >
                            <div
                                className={clsx({
                                    [classes.btnRoot]: true,
                                    [classes.subMenu]: level
                                })}
                            >
                                <div>
                                    {
                                        (name==="Date Between") ?<div>
                                            <label className="text-left">Select Date Range</label><br></br>
                                            <input type="date" value={calv1} id="basic1" onChange={handleinput}  />
                                            <input type="date" value={calv2} id="basic2" onChange={handleinput} />
                                            </div>:
                                        (name==="Exact Date") ?<div>
                                            <label className="text-left">Select Date</label>
                                            <Calendar value={date} id="basic3" onChange={handleinput} />
                                            </div>:
                                            <div>
                                                <input type="checkbox" onClick={handleinput} name={name} className="mr-1" value={name} />{name}
                                            </div>
                                    }
                                </div>
                            </div>
                        </ListItem>
                    </List>
                )
            }
            return (
                <div key={index}>
                    <ListItem
                        className={classes.item}
                        disableGutters
                        key={index}
                        onClick={() => handleClick(name)}
                    >
                        <Button
                            className={clsx({
                                [classes.btnRoot]: true,
                                [classes.button]: true,
                                [classes.subMenu]: level
                            })}>
                            {
                                (name!=="date")?<div>
                                <input type="checkbox" onClick={hanleInputBox} className="mr-1" value={name} />
                            </div>:""} {name}
                             {menu[name] ? <ExpandLess /> : <ExpandMore />}
                        </Button>
                    </ListItem>
                    <Collapse
                        in={(menu[name]) ? true : false}
                        timeout="auto"
                        unmountOnExit
                    >
                        {handleMenu(children, 1)}
                    </Collapse>
                </div>
            )
        })
    }
    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            open={true}
            variant="persistent"
        >
            <List {...rest} className={clsx(classes.root, className)} >
                {handleMenu(menuItems.data)}
            </List>
        </Drawer>
    )
}
export default MenuBar;