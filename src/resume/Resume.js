import React, { useEffect } from 'react';

const Resume = (props) => {
  useEffect(()=> {

  },[props.data])
  return (
    <div dangerouslySetInnerHTML={{ __html: props.data }}></div>
  );
};

export default Resume;
