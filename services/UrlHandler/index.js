import React, { useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
const Urlhandler = () => {
    const history = useHistory();
    useEffect(() => {
        alert("URL is not found, either it is misstyped or URL is not defined yet");
    })

    return(
        <Link to={history.goBack()}/>
    )
}
export default Urlhandler;