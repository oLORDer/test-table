import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://638a18154eccb986e8a3bd07.mockapi.io/lord/table',
});

export const axiosGetAllPatients = async () => {
  return await instance.get();
};

export const axiosAddPatient = async (obj) => {
  const { data } = await instance.post(`/`, obj);
  return data;
};

export const axiosRemovePatient = async (id) => {
  const { data } = await instance.delete(`/${id}`);
  return data;
};

export const axiosChangePatient = async (id) => {
  const { data } = await instance.put(`/${id}`);
  return data;
};
