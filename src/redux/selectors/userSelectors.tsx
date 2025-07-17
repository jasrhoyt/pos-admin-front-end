


export const selectUser = (state: any) => state.user;

export const selectUserFullName = (state: any) =>
    `${state.user.firstName} ${state.user.lastName}`;

export const selectUserAddress = (state: any) => state.user.address;

export const selectUserEmail = (state: any) => state.user.email;