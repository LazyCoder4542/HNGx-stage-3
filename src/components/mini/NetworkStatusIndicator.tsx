import * as React from 'react';
import useNavigationOnline from '../../hooks/useNavigatorOnline';
import { IPopupContext, usePopup } from './popupContext';

function NetworkStatusIndicator() {
    const { triggerPopup } = usePopup() as IPopupContext
    const isOnline = useNavigationOnline();
    const firstUpdate = React.useRef(true);
    React.useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        isOnline
            ? triggerPopup('You are back online!', "success")
            : triggerPopup('You are currently offline', "error");
    }, [isOnline, triggerPopup])
    return null
}

export default NetworkStatusIndicator;