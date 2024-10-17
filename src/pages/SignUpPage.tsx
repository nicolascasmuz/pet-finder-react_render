import React, { useState, useEffect, useRef } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import "./sign-up-page.css";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import { useLogOut } from "../hooks/useLogOut";

function SignUpPage() {
  const logOut = useLogOut();
  useEffect(() => {
    logOut();
  }, []);

  const signUp = useSignUp();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);
  const checkpassInputRef = useRef<HTMLInputElement>(null);

  const [emailDisplay, setEmailDisplay] = useState(false);
  const [passDisplay, setPassDisplay] = useState(false);
  const [checkpassDisplay, setCheckpassDisplay] = useState(false);
  const [mpDisplay, setMpDisplay] = useState(false);

  const HandleLogIn = async (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    const passValue = e.target.pass.value;
    const checkpassValue = e.target.checkpass.value;

    if (emailValue && passValue && checkpassValue) {
      if (passValue === checkpassValue) {
        try {
          await signUp(emailValue, passValue);
          emailInputRef.current.style.border = "solid 1px #b2bec3";
          passInputRef.current.style.border = "solid 1px #b2bec3";
          checkpassInputRef.current.style.border = "solid 1px #b2bec3";
          setEmailDisplay(false);
          setPassDisplay(false);
          setCheckpassDisplay(false);
          setMpDisplay(false);
        } catch (error) {
          console.error("Error al iniciar sesión: ", error);
        }
      } else if (passValue !== checkpassValue) {
        emailInputRef.current.style.border = "solid 1px #b2bec3";
        passInputRef.current.style.border = "solid 3px #EA2027";
        checkpassInputRef.current.style.border = "solid 3px #EA2027";
        setEmailDisplay(false);
        setPassDisplay(false);
        setCheckpassDisplay(false);
        setMpDisplay(true);
      }
    } else if (!emailValue && passValue && checkpassValue) {
      emailInputRef.current.style.border = "solid 3px #EA2027";
      passInputRef.current.style.border = "solid 1px #b2bec3";
      checkpassInputRef.current.style.border = "solid 1px #b2bec3";
      setEmailDisplay(true);
      setPassDisplay(false);
      setCheckpassDisplay(false);
      setMpDisplay(false);
    } else if (emailValue && !passValue && checkpassValue) {
      emailInputRef.current.style.border = "solid 1px #b2bec3";
      passInputRef.current.style.border = "solid 3px #EA2027";
      checkpassInputRef.current.style.border = "solid 1px #b2bec3";
      setEmailDisplay(false);
      setPassDisplay(true);
      setCheckpassDisplay(false);
      setMpDisplay(false);
    } else if (emailValue && passValue && !checkpassValue) {
      emailInputRef.current.style.border = "solid 1px #b2bec3";
      passInputRef.current.style.border = "solid 1px #b2bec3";
      checkpassInputRef.current.style.border = "solid 3px #EA2027";
      setEmailDisplay(false);
      setPassDisplay(false);
      setCheckpassDisplay(true);
      setMpDisplay(false);
    } else if (!emailValue && !passValue && checkpassValue) {
      emailInputRef.current.style.border = "solid 3px #EA2027";
      passInputRef.current.style.border = "solid 3px #EA2027";
      checkpassInputRef.current.style.border = "solid 1px #b2bec3";
      setEmailDisplay(true);
      setPassDisplay(true);
      setCheckpassDisplay(false);
      setMpDisplay(false);
    } else if (emailValue && !passValue && !checkpassValue) {
      emailInputRef.current.style.border = "solid 1px #b2bec3";
      passInputRef.current.style.border = "solid 3px #EA2027";
      checkpassInputRef.current.style.border = "solid 3px #EA2027";
      setEmailDisplay(false);
      setPassDisplay(true);
      setCheckpassDisplay(true);
      setMpDisplay(false);
    } else if (!emailValue && passValue && !checkpassValue) {
      emailInputRef.current.style.border = "solid 3px #EA2027";
      passInputRef.current.style.border = "solid 1px #b2bec3";
      checkpassInputRef.current.style.border = "solid 3px #EA2027";
      setEmailDisplay(true);
      setPassDisplay(false);
      setCheckpassDisplay(true);
      setMpDisplay(false);
    } else if (!emailValue && !passValue && !checkpassValue) {
      emailInputRef.current.style.border = "solid 3px #EA2027";
      passInputRef.current.style.border = "solid 3px #EA2027";
      checkpassInputRef.current.style.border = "solid 3px #EA2027";
      setEmailDisplay(true);
      setPassDisplay(true);
      setCheckpassDisplay(true);
      setMpDisplay(false);
    }
  };

  return (
    <div className="general-container">
      <h1 className="sign-up-main-title">Registrarse</h1>
      <p className="paragraph-01">
        Ingresá los siguientes datos para realizar el registro
      </p>
      <form className="signup-form" onSubmit={HandleLogIn}>
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
        <FormInputComp
          className="input3"
          type="password"
          name="checkpass"
          textContent="CONFIRMAR CONTRASEÑA"
          ref={checkpassInputRef}
          rfDisplay={checkpassDisplay}
          mpDisplay={mpDisplay}
        />
        <p className="paragraph-02">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/log-in" className="login-link">
            Iniciar sesión.
          </Link>
        </p>
        <div className="button-access">
          <ButtonComp color="#ff7f87" textContent="Siguiente" />
        </div>
      </form>
    </div>
  );
}

export { SignUpPage };
