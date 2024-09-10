import React from 'react'
import './PageNotFound.scss';
import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function PageNotFound() {
  return (
    <div className='not-found'>
        <h1>
          <FontAwesomeIcon icon={faFaceSadCry} />
          404: Page not found</h1>
    </div>
  )
}
