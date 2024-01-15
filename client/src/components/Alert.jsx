import '../styles/components/alert.css'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from '../redux/actions';

export default function Alert(props) {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    const handleShowAlert = () => {
        setTimeout(() => {
            dispatch(hideAlert());
        }, 1500);
    };

    useEffect(() => {
        if (alert.show) handleShowAlert();
    }, [alert]);

    return (
        <div className={`modal ${alert.show ? "" : "hidden"} `}>
            <div className="modal-content">
                <p>{alert.message}</p>
            </div>
        </div>
    );
};