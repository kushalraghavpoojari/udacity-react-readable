import React from 'react';
import {Link} from 'react-router-dom'
import Back from 'react-icons/lib/ti/arrow-left-thick'

const NotFound = () =>
  <div>
    <div className='row title'>
        <div className='col-md-1'>
            <Link to='/'><Back size={30} className='back-icon'/></Link>
        </div>
        <div className='col-md-11'>
            Readable
        </div>
    </div>
    <div className='row'>
      <div className='col-md-3'></div>
      <div className=' col-md-9'>
        <h3><b>404 page not found</b></h3>
        <em>We are sorry but the post you are looking for does not exist.</em>
      </div>
    </div>
  </div>

export default NotFound;