import s from './modal.module.scss';

const Modal = ({ children }: any) => {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>{children}</div>
    </div>
  );
};

export default Modal;
