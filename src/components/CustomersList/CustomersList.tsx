import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { axiosAddPatient } from '../../api/table';

import Loader from '../Loader';
import Modal from '../Modal';

import s from './CustomersList.module.scss';

interface IItem {
  id: string;
  name: string;
  lastname: string;
  gender: string;
  birthday: string;
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

  const removeCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRemove(e.currentTarget.dataset.id);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('invalid email')
      .required('Please, enter your email'),
    name: yup
      .string()
      .max(12, 'up to 12 characters')
      .required(`Please, enter your name`),
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const addNewCust = async (obj: object) => {
    const res = await axiosAddPatient(obj);
    console.log(res);
  };

  const handleSubmit = ({
    name,
    lastname,
    gender,
    birthday,
    position,
    email,
  }: any) => {
    const value = {
      name,
      lastname,
      gender,
      birthday,
      position,
      email,
    };

    addNewCust(value);
    setTimeout(() => {
      window.location.reload();
    }, 300);
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
            <th>Birthday</th>
            <th>Position</th>
            <th>email</th>
          </tr>
        </thead>

        <tbody>
          {items.map(
            ({ id, name, lastname, gender, birthday, position, email }, i) => {
              return (
                <tr key={id}>
                  <td>{++i}</td>
                  <td>{name}</td>
                  <td>{lastname}</td>
                  <td>{gender}</td>
                  <td>{birthday?.slice(0, 10)}</td>
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

      {modalIsOpen && (
        <Modal>
          <Formik
            initialValues={{
              name: '',
              lastname: '',
              gender: '',
              birthday: '',
              position: '',
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className={s.form}>
                <label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={values.name}
                    required={true}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </label>
                <label>
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Lastname"
                    value={values.lastname}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <Field
                    name="gender"
                    type="text"
                    placeholder="Gender"
                    value={values.gender}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <Field
                    name="birthday"
                    type="text"
                    placeholder="Birthday"
                    value={values.birthday}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <Field
                    name="position"
                    type="text"
                    placeholder="Position"
                    value={values.position}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && <p>{errors.email}</p>}
                </label>
                <button className={s.btn} type="submit">
                  Create
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export default CustomesrList;
