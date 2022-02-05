export const createAction = (type) => {
    return (payload) => ({type: type, payload});
};
