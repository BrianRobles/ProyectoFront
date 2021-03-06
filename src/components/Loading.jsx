import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <ReactLoading
      className='centered'
      color='#4338ca'
      type='spin'
      height={100}
      width={100}
    />
  );
};

export default Loading;
