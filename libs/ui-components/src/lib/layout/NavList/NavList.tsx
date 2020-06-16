import { Button, Collapse, List, ListIcon, ListItem } from '@chakra-ui/core';
import { ComputedRouteType, RouteManagerContext } from '@kwjs/route-manager';
import React, { useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

interface NavListProps {
    handleDrawerClose: () => void;
}

const NestedNavListItem: React.FC<{
    handleDrawerClose: () => void;
    navItem: Partial<ComputedRouteType>;
}> = ({ handleDrawerClose, navItem }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = (e: any) => {
        setOpen(!open);
        e.stopPropagation();
    };

    return (
        <>
            <ListItem>
                <Button variant="ghost" onClick={handleClick} width={'100%'}>
                    Nested List Item
                </Button>
                <Collapse isOpen={open}>
                    <List>
                        {navItem.subRoutes?.map(route => (
                            <ComputedNavRoute
                                key={route.name + route.path}
                                navItem={route}
                                handleDrawerClose={handleDrawerClose}
                            />
                        ))}
                    </List>
                </Collapse>
            </ListItem>
        </>
    );
};

const NoSubrouteNavListItem: React.FC<{
    handleDrawerClose: () => void;
    navItem: Partial<ComputedRouteType>;
}> = ({ navItem, handleDrawerClose }) => {
    const { push } = useHistory();

    return (
        <Link
            key={navItem.name}
            to={navItem.path}
            onClick={evt => {
                handleDrawerClose();
                push(navItem.path);
            }}
        >
            <ListItem>
                <ListIcon
                    title={navItem.name}
                    icon={navItem.icon || 'check-circle'}
                    color="green.500"
                />
                {navItem.name}
            </ListItem>
        </Link>
    );
};

const ComputedNavRoute: React.FC<{
    navItem: Partial<ComputedRouteType>;
    handleDrawerClose: () => void;
}> = ({ navItem, handleDrawerClose }) => {
    if (navItem.subRoutes && navItem.subRoutes.length > 0) {
        return (
            <NestedNavListItem
                handleDrawerClose={handleDrawerClose}
                navItem={navItem}
                key={navItem.path}
            />
        );
    }
    return (
        <NoSubrouteNavListItem
            handleDrawerClose={handleDrawerClose}
            navItem={navItem}
            key={navItem.path}
        />
    );
};

export const NavList: React.FC<NavListProps> = ({ handleDrawerClose }) => {
    const { state: routeManagerState } = useContext(RouteManagerContext);

    const computedRoutes = useMemo(() => routeManagerState.computedRoutes, [
        routeManagerState.computedRoutes
    ]);

    return (
        <List className="navList" as="nav">
            {computedRoutes.map(navItem => (
                <ComputedNavRoute
                    key={navItem.name + navItem.path}
                    navItem={navItem}
                    handleDrawerClose={handleDrawerClose}
                />
            ))}
        </List>
    );
};

export default NavList;
