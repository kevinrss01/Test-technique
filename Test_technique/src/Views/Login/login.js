import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../CSS/style_login.css';

const LoginContainer = () => {
	const { register, handleSubmit, formState, setFocus } = useForm();
	const { errors, isDirty, dirtyFields, submitCount, isValid } = formState;
	const [incredibleBigWall, setIncredibleBigWall] = useState(true);
	// const [visibleModal, setVisibleModal] = useState(false);

	const onSubmit = (data) => {
		if (isValid && incredibleBigWall) {
			// setVisibleModal(true);
			console.log('Hum .... Toujours pas!');
			console.log('Tu dois te rendre sur la page Movie');
			navigate('/movies-list');
		}
	};

	let navigate = useNavigate();

	useEffect(() => {
		const firstError = Object.keys(errors).reduce((field, a) => {
			return !!errors[field] ? field : a;
		}, null);
		if (firstError) {
			setFocus(firstError);
		}
	}, []);

	const LabelizeInput = ({
		name,
		defaultValue,
		register,
		dirtyFields,
		errors,
		required,
	}) => {
		return (
			<div className="divLabel">
				<label>{name}</label>
				<input defaultValue={defaultValue} />
				{!isValid && <span>Le champ {name} est obligatoire</span>}
			</div>
		);
	};

	return (
		<div className="bodyLoginPage">
			<div className="containerLogin">
				<div className="welcomeMessageContainer">
					Bienvenue
					<br /> jeune padawan
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<LabelizeInput
						name="Email"
						defaultValue=""
						register={register}
						dirtyFields={dirtyFields}
						isDirty={isDirty}
						errors={errors}
						required={true}
					/>
					<LabelizeInput
						name="Mot de passe"
						defaultValue=""
						register={register}
						dirtyFields={dirtyFields}
						isDirty={isDirty}
						errors={errors}
						required={true}
					/>
					<input type="submit" value="Accéder à la suite" />
				</form>
			</div>
			{/* )} */}
		</div>
	);
};

export default LoginContainer;
