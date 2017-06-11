import React from 'react';
import EditEventContainer from '../components/Containers/EditEventContainer';


const EditEventPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-text-center">Edit Event</h1>

    <EditEventContainer eventId={_id} />
  </div>
);


export default EditEventPage;