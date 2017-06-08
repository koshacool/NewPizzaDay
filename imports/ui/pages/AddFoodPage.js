import React from 'react';
import AddFoodContainer from '../components/Containers/AddFoodContainer';


const AddFoodPage = ({ params: { _id } }) => (
  <div>
    <h1 className="md-text-center">add food</h1>

   	<AddFoodContainer eventId={_id} />
  </div>
);


export default AddFoodPage;