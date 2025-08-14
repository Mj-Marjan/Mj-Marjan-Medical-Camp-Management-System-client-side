import React from 'react';
import { useLoaderData } from 'react-router';
import ShowCampDetails from './ShowCampDetails';

const CampDetails = () => {
  const camp = useLoaderData();
  return (
    <div>
      <ShowCampDetails camp={camp} />
    </div>
  );
};

export default CampDetails;
