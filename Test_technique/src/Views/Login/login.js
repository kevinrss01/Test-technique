import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BiUserCircle } from 'react-icons/bi';
import { RiKey2Fill } from 'react-icons/ri';
import { AiFillFacebook } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { AiOutlineGoogle } from 'react-icons/ai';

import * as Yup from 'yup';
import '../CSS/style_login.css';

const LoginContainer = () => {
	const [checked, setChecked] = useState(false);

	const initialValues = {
		email: '',
		password: '',
	};

	const handleChange = () => {
		setChecked(!checked);
	};

	const onSubmit = (data) => {
		navigate('/movies-list');
	};

	let navigate = useNavigate();

	useEffect(() => {}, []);

	//control Input
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.min(3, 'Email trop court')
			.max(30, "Le nom d'utilisateur ne peut contenir que 30 caractères")
			.required('Email Obligatoire'),
		password: Yup.string()
			.min(4, 'Mot de passe trop court')
			.max(20, 'Mot de passe trop long')
			.required('Mot de passe obligatoire'),
	});

	return (
		<div className="bodyLoginPage">
			<div className="containerLogin">
				<div className="welcomeMessageContainer">
					Bienvenue
					<br /> jeune padawan
				</div>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					<Form id="form">
						<ErrorMessage
							name="email"
							component="span"
							className="errorMessage"
						/>
						<div className="flexCentre">
							<div className="containerIconInput  flexCentre">
								<BiUserCircle className="iconInput" />
							</div>
							<Field
								autoComplete="off"
								id="inputEmail"
								name="email"
								placeholder="Email"
							/>
						</div>

						<ErrorMessage
							name="password"
							component="span"
							className="errorMessage"
						/>
						<div className="flexCentre">
							<div className="containerIconInput flexCentre">
								<RiKey2Fill className="iconInput" />
							</div>
							<Field
								type="password"
								id="inputPassword"
								name="password"
								placeholder="Mot de passe"
							/>
						</div>

						<div className="checkAndLogin flexCentre">
							<div className="souvenir">
								<input
									type="checkbox"
									checked={checked}
									onChange={handleChange}
									className="rememberCheckbox"
								/>
								<span>Se souvenir de moi</span>
							</div>

							<button type="submit" className="registrationBtn flexCentre">
								Connexion
							</button>
						</div>
						<div className="regisForgotPassContainer">
							<span className="register">S'inscrire</span>
							<span>Mot de passe oublié ?</span>
						</div>
						<div className="divider">
							<hr class="solid"></hr>
							<span>ou</span>
							<hr class="solid"></hr>
						</div>
						<div className="containerLoginWith">
							<div className="loginWith">
								<div className="containerLogo colorFb1">
									<AiFillFacebook className="iconSocialMedia" />
								</div>
								<div className="containerText colorFb2">
									Connexion avec Facebook
								</div>
							</div>

							<div className="loginWith  ">
								<div className="containerLogo colorTwitter1">
									<AiOutlineTwitter className="iconSocialMedia" />
								</div>
								<div className="containerText colorTwitter2">
									Connexion avec Twitter
								</div>
							</div>

							<div className="loginWith">
								<div className="containerLogo colorGoogle1">
									<AiOutlineGoogle className="iconSocialMedia" />
								</div>
								<div className="containerText colorGoogle2">
									Connexion avec Google
								</div>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
			<div className="backgroundLogin"></div>
		</div>
	);
};

export default LoginContainer;
