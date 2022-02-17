/**
 *
 * @param file is an image that should be transformed to base64 String format.
 * @returns Promise that should be resolved or rejected.
 */
export const toBase64 = (file) =>
	new Promise((res, rej) => {
		const fd = new FileReader();
		fd.readAsDataURL(file);

		fd.onload = () => res(fd.result);
		fd.onerror = (err) => rej(err);
	});

export const validate = (card, name, CVV, date, year) => {
	let valid = require('card-validator');
	const { cardholderName, cvv, expirationDate, expirationYear, number } = valid;
	return (
		cardholderName(name).isValid &&
		cvv(CVV).isValid &&
		expirationYear(year).isValid &&
		expirationDate(date) &&
		number(card).isValid
	);
};
