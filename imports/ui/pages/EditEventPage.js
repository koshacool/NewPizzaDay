import React from 'react';
import EditEventContainer from '../components/Containers/EditEventContainer';


const EditEventPage = ({ params: { _id }, children }) => (
  <div>
    <h1 className="md-text-center">Edit Event</h1>

    <EditEventContainer eventId={_id} children={children} />
  </div>
);


export default EditEventPage;