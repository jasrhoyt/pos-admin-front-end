

export interface IUserState {
    userId: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    address: {
        streetAddress: string;
        city: string;
        state: string;
        zipcode: string;
    }
}

export const selectUser = (state: any): IUserState => state.user;

export const selectUserFullName = (state: any) =>
    `${state.user.firstName} ${state.user.lastName}`;

export const selectUserAddress = (state: any) => state.user.address;

export const selectUserEmail = (state: any) => state.user.email;