import React, { useImperativeHandle, useRef } from 'react';
import reactDom from 'react-dom';
import { Button } from 'reactstrap';
import useToggle from "../hooks/useToggle";


const modalElement = document.querySelector("#modal-root");

/**
 * For use is mandatory to add <div id="modal-root"></div> to body
 * @param {*} ChildrenComponent 
 * @param {*} style 
 * @returns 
 */
const Modal = (props, ref) =>
{
    const { children, defaultOpened = false } = props;
    const [isToggleOn, toggle] = useToggle(defaultOpened);

    useImperativeHandle(
        ref,
        () => ({
            toggle: () => toggle()
        }),
        [toggle],
    )

    return reactDom.createPortal(
        isToggleOn ?
            (
                <div className="m-modal-fade">
                    <div className="m-modal-overlay" onClick={toggle}>
                        <div className="m-modal-element">
                            <Button className="m-modal-close" color="secondary" onClick={toggle} aria-label="close">X</Button>
                            <div className="m-modal-body">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )
            : null
        , modalElement)
}
export default React.forwardRef(Modal);

