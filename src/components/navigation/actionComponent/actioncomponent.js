import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function actioncomponent({icon,name,link}) {
    return (
        <div>
            <Link to={link} className="p-2 b-secondcolor br-maincolor hover-maincolor cursor-pointer flex gap-3">
                <FontAwesomeIcon className="text-center text-maincolor" size="2x"  icon={icon}/><p className="mt-1 icon-text" hidden>{name}</p>
            </Link>
        </div>
    );
}

export default actioncomponent;