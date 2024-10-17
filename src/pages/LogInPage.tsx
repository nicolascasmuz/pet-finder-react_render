import React, { useState, useEffect, useRef } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import { Link } from "react-router-dom";
import { useLogIn } from "../hooks/useLogIn";
import "./log-in-page.css";
import { useLogOut } from "../hooks/useLogOut";

function LogInPage() {
  const logOut = useLogOut();
  useEffect(() => {
    logOut();
  }, []);

  const logIn = useLogIn();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);

  const [emailDisplay, setEmailDisplay] = useState(false);
  const [passDisplay, setPassDisplay] = useState(false);

  const HandleLogIn = async (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    const passValue = e.target.pass.value;
    if (emailValue && passValue) {
      try {
        await logIn(emailValue, passValue);
        emailInputRef.current.style.border = "solid 1px #b2bec3";
        passInputRef.current.style.border = "solid 1px #b2bec3";
        setEmailDisplay(false);
        setPassDisplay(false);
      } catch (error) {
        if (emailInputRef.current) {
          emailInputRef.current.style.border = "solid 3px #EA2027";
        }
        if (passInputRef.current) {
          passInputRef.current.style.border = "solid 3px #EA2027";
        }
        console.error("Error al iniciar sesión: ", error);
      }
    }
    if (!emailValue && passValue) {
      emailInputRef.current.style.border = "solid 3px #EA2027";
      passInputRef.current.style.border = "solid 1px #b2bec3";
      setEmailDisplay(true);
      setPassDisplay(false);
    } else if (emailValue && !passValue) {
      emailInputRef.current.style.border = "solid 1px #b2bec3";
      passInputRef.current.style.border = "solid 3px #EA2027";
      setEmailDisplay(false);
      setPassDisplay(true);
    } else if (!emailValue && !passValue) {
      emailInputRef.current.style.border = "solid 3px #EA2027";
      passInputRef.current.style.border = "solid 3px #EA2027";
      setEmailDisplay(true);
      setPassDisplay(true);
    }
  };

  return (
    <div className="general-container">
      <h1 className="log-in-main-title">Iniciar sesión</h1>
      <p className="paragraph-01">
        Ingresá los siguientes datos para iniciar sesión
      </p>
      <form className="login-form" onSubmit={HandleLogIn}>
        <FormInputComp
          className="input1"
          type="email"
          name="email"
          textContent="EMAIL"
          ref={emailInputRef}
          rfDisplay={emailDisplay}
        />
        <FormInputComp
          className="input2"
          type="password"
          name="pass"
          textContent="CONTRASEÑA"
          ref={passInputRef}
          rfDisplay={passDisplay}
        />
        <p className="paragraph-02">
          ¿Aún no estás registrado?{" "}
          <Link to="/sign-up" className="login-link">
            Registrarse.
          </Link>
        </p>
        <div className="button-next">
          <ButtonComp color="#ff7f87" textContent="Acceder" />
        </div>
      </form>
    </div>
  );
}

export { LogInPage };
