import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from '@chakra-ui/core';
import { AppState, SetNavExpanded, ClearJwt } from '@kwjs/ui-state';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../AppBar/AppBar';
import NavList from '../NavList/NavList';

export const AppLayout: React.FC = ({ children }) => {
    const dispatch = useDispatch();
    const { navExpanded } = useSelector((state: AppState) => ({
        navExpanded: state.System.navExpanded
    }));

    const onClose = () => {
        dispatch(SetNavExpanded(false));
    };

    const logout = () => {
        dispatch(ClearJwt());
    };

    return (
        <>
            <AppBar />
            <Drawer isOpen={navExpanded} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        [Insert something header worthy here]
                    </DrawerHeader>

                    <DrawerBody>
                        <NavList handleDrawerClose={onClose} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="solid"
                            variantColor="blue"
                            w={'100%'}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <main>{children}</main>
        </>
    );
};

export default AppLayout;
