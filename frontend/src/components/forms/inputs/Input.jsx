/**
 * Subcomponente de CreateForm
 * @param props - props del subcomponente
 * @description props.register ->  Función "register" de react hook form
 * @description props.field -> Objeto que contiene la información del label
 * (title), el nombre de la variable (name), y el tipo de input (type)
 * @returns
 */
const Input = ({ register, field, errors }) => {
  return (
    <div className="c-create-form__input-container">
      <label className="c-create-form__label" htmlFor={field.name}>
        {field.title}
      </label>
      <input
        className={`c-create-form__input ${
          errors[field.name] && "c-create-form__input--error"
        }`}
        type={field.type}
        id={field.name}
        {...register(field.name, { required: true })}
      />
    </div>
  );
};

export default Input;
