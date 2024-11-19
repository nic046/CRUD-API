import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../styles/AddEdit.css";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  first_name: yup.string().required("El nombre de usuario es requerido"),
  last_name: yup.string().required("El apellido de usuario es requerido"),
  email: yup
    .string()
    .email("Formato de email invalido")
    .required("El email de usuario es requerido"),
  password: yup.string().required("El password de usuario es requerido"),
});

export default function AddEdit({ user, onSave }) {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user || {},
  });
  useEffect(() => {
    if (user) {
      reset(user);
    } else {
      reset({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthday: "",
        image_url: "",
        showBirthday: false,
      });
    }
  }, [user, reset]);

  const onSubmit = (dataForm) => {
    if (dataForm.image_url) {
        if(dataForm.image_url === "robot")
            dataForm.image_url = `https://robohash.org/${dataForm.first_name}-${dataForm.last_name}`;
        else if (dataForm.image_url === "cat")
            dataForm.image_url = `https://robohash.org/${dataForm.first_name}-${dataForm.last_name}?set=set4`;
    }
    if (user) {
      onSave(dataForm, user.id);
    } else {
      onSave(dataForm);
    }
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
      image_url: "",
      showBirthday: false,
    });
  };

  const showBirthday = watch("showBirthday", false);
  return (
    <div className="form">
      <h2 className="form__title">{user ? "Actualizar" : "Registrar"}</h2>
      <form className="form__content" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group">
          <label className="form__label"> Nombre: </label>
          <input
            className="form__input"
            type="text"
            {...register("first_name")}
          />
          <span className="form__error">
            {errors.first_name && errors.first_name.message}
          </span>
        </div>
        <div className="form__group">
          <label className="form__label"> Apellido: </label>
          <input
            className="form__input"
            type="text"
            {...register("last_name")}
          />
          <span className="form__error">
            {errors.last_name && errors.last_name.message}
          </span>
        </div>
        <div className="form__group">
          <label className="form__label"> Email: </label>
          <input className="form__input" type="text" {...register("email")} />
          <span className="form__error">
            {errors.email && errors.email.message}
          </span>
        </div>
        <div className="form__group">
          <label className="form__label"> Contraseña: </label>
          <input
            className="form__input"
            type="password"
            {...register("password")}
          />
          <span className="form__error">
            {errors.password && errors.password.message}
          </span>
        </div>
        <div>
          <input
            type="checkbox"
            {...register("showBirthday")}
            id="showBirthday"
          />
          <label className="form__label" htmlFor="showBirthday">
            ¿Desea {user ? "actualizar el" : "ingresar su"} cumpleaños?
          </label>
          <br />
        </div>
        {showBirthday && (
          <div className="form__group">
            <label className="form__label"> Cumpleaños: </label>
            <input
              className="form__input"
              type="date"
              {...register("birthday")}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        )}
        <div className="form__selector">
          <label className="form__label">
            Elija una categoria de foto de perfil
          </label>
          <select className="form__select" {...register("image_url")}>
            <option value="">Ninguna</option>
            <option value="robot">robot</option>
            <option value="cat">Gato</option>
          </select>
        </div>

        <button className="submit" type="submit">
          {user ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}
