import { Field } from 'formik';

function Input({ type, placeholder, name, className }) {
	return <Field type={type} placeholder={placeholder} name={name} className={className} />;
}

export default Input;
