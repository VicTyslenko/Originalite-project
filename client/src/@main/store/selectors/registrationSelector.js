export const isRegistrationSelector = (state) => Boolean(state.registration.data);
export const errorDataRegister = (state) => state.registration.error;
export const tokenDataSelector = (state) => state.registration.data;
