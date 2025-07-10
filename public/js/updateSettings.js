import axios from 'axios';
import { showAlert } from './alerts';

// type is password or data
// data is data object
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updatePassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status == 'Success' || 'success') {
      showAlert('success', `${type} Updated Successfully!!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
