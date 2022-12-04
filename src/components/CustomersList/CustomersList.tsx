import React, { useEffect, useState } from 'react';
// import { Formik } from 'formik';
// import * as yup from 'yup';

import { axiosAddPatient } from '../../api/table';

import Loader from '../Loader';
import Modal from '../Modal';

import s from './CustomersList.module.scss';

interface IItem {
  id: string;
  name: string;
  lastname: string;
  gender: string;
  birsday: string;
  position: string;
  email: string;
}

interface IProps {
  items: IItem[];
  handleRemove: (a?: string) => void;
  handleSubmit: () => void;
}
const CustomesrList: React.ComponentType<IProps> = ({
  items,
  handleRemove,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const onEscPush = (e: any) => {
      if (e.code !== 'Escape') {
        return;
      }
      setModalIsOpen(false);
    };

    window.addEventListener('keydown', onEscPush);

    return () => {
      window.removeEventListener('keydown', onEscPush);
    };
  }, [setModalIsOpen]);

  // const validationSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email('invalid email')
  //     .required('Please, enter your email'),
  //   name: yup.string().required(`Please, enter your name`),
  // });

  const removeCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRemove(e.currentTarget.dataset.id);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const addNewCust = async (obj: object) => {
    const res = await axiosAddPatient(obj);
    console.log(res);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { name, lastname, gender, birsday, position, email } =
      e.currentTarget.elements;
    const newCustore = {
      name: name.value,
      lastname: lastname.value,
      gender: gender.value,
      birsday: birsday.value,
      position: position.value,
      email: email.value,
    };

    addNewCust(newCustore);

    setTimeout(() => {
      window.location.reload();
    }, 300);

    // console.log(newCustore);
  };

  return (
    <>
      {!items.length && <Loader />}
      <button className={s.btn} onClick={openModal}>
        Add new customer
      </button>
      <table className={s.table}>
        <caption>Patients list</caption>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Gender</th>
            <th>Birsday</th>
            <th>Position</th>
            <th>email</th>
          </tr>
        </thead>

        <tbody>
          {items.map(
            ({ id, name, lastname, gender, birsday, position, email }, i) => {
              return (
                <tr key={id}>
                  <td>{++i}</td>
                  <td>{name}</td>
                  <td>{lastname}</td>
                  <td>{gender}</td>
                  <td>{birsday.slice(0, 10)}</td>
                  <td>{position}</td>
                  <td>{email}</td>

                  <td>
                    <button
                      className={s.remove}
                      onClick={removeCustom}
                      data-id={id}
                    >
                      remove
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {/* <Formik
        initialValues={{
          email: '',
          name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      ></Formik> */}
      {modalIsOpen && (
        <Modal>
          <form onSubmit={handleSubmit} className={s.form}>
            <input type="name" name="name" placeholder="Name" />
            <input type="lastname" name="lastname" placeholder="lastname" />
            <input type="text" name="gender" placeholder="gender" />
            <input type="text" name="birsday" placeholder="birsday" />
            <input type="text" name="position" placeholder="position" />
            <input type="email" name="email" placeholder="email" />
            <button className={s.btn} type="submit">
              Create
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CustomesrList;
