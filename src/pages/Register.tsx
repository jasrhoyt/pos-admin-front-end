import {Stack, Box, ThemeProvider, } from "@mui/material";
import {useEffect, useState} from "react";
import {RegisterTheme} from "../themes/RegisterTheme";
import backgroundImage from "../assets/pooches.jpg";
import {useAdmin} from "../services/useAdmin";
import {useNavigate} from "react-router-dom";
import {clearUser, setUser as setCurrentUser} from "../redux/slices/userSlices";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/selectors/userSelectors";
import {RegisterUserInfo} from "../components/Register/RegisterUserInfo";
import {RegisterCompanyInfo} from "../components/Register/RegisterCompanyInfo";
import {RegisterButtonContainer} from "../components/Register/RegisterButtonContainer";
import {colors} from "../themes/colors";
import {toNullIfEmpty, validate_password} from "../services/utilities";
import {useRefData} from "../services/useRefDataServices";


export const Register = ({ isUserSettings = false }:{ isUserSettings?: boolean}) => {

    const { getStates } = useRefData()
    const { postAdmin } = useAdmin();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ firstName, setFirstName ] = useState<string>("");
    const [ lastName, setLastName ] = useState<string>("");
    const [ companyName, setCompanyName ] = useState<string>("");
    const [ companyEmail, setCompanyEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ verifyPassword, setVerifyPassword ] = useState<string>("");
    const [ streetAddress, setStreetAddress ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ state, setState ] = useState<string>("");
    const [ zipcode, setZipcode ] = useState<string>("");
    const [ phoneNumber, setPhoneNumber ] = useState<string>("");

    const currentUser = useSelector(selectUser)
    const [ stateOptions, setStateOptions ] = useState<any[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const buttonCopy = isUserSettings ? "Update User Info" : "Register for PoS-Systems"

    const onRegister = async () => {
        const isPasswordVerified = validate_password(password, verifyPassword);
        if (!isPasswordVerified) {
            setErrorMessage("Password and Verified Password must match!");
        } else {
            const response = await postAdmin(
                firstName,
                lastName,
                companyName,
                companyEmail,
                password,
                streetAddress,
                city,
                state,
                zipcode,
                phoneNumber
            );
            if (response.errorMessage) {
                setErrorMessage(response.errorMessage);
            } else {
                dispatch(
                    setCurrentUser({
                        userId: response.user_id,
                        firstName: response.first_name,
                        lastName: response.last_name,
                        companyName: response.company_name,
                        email: response.email,
                        phoneNumber: response.phone_number,
                        address: {
                            streetAddress: response.address.street_address,
                            city: response.address.city,
                            state: response.address.state,
                            zipcode: response.address.zipcode,
                        }
                    })
                );
                navigate("/dashboard");
            }
        }
    }

    useEffect(() => {
        (async () => {
            const states = await getStates();
            setStateOptions(states);
        })();
    }, []);

    useEffect(() => {
        if (!isUserSettings) {
            dispatch(clearUser());
        }
        setFirstName(currentUser.firstName)
        setLastName(currentUser.lastName)
        setCompanyName(currentUser.companyName)
        setCompanyEmail(currentUser.email)
        setPhoneNumber(currentUser.phoneNumber)
        setStreetAddress(currentUser.address.streetAddress)
        setCity(currentUser.address.city)
        const state = stateOptions.find(
            (option) => option.state_name === currentUser.address.state
        )?.state_name
        setState(state || "")
        setZipcode(currentUser.address.zipcode)

    }, [stateOptions]);

    return (
        <ThemeProvider theme={RegisterTheme}>
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Stack
                    spacing={4}
                    sx={{
                        backgroundColor: colors.white,
                        width: { sm: "70%", lg: "40%", xl: "25%" },
                        padding: "2rem",
                        borderRadius: "8px",
                    }}
                >
                    <RegisterUserInfo
                        firstName={firstName}
                        setFirstName={(inputString) => setFirstName(inputString)}
                        lastName={lastName}
                        setLastName={(inputString) => setLastName(inputString)}
                        companyName={companyName}
                        setCompanyName={(inputString) => setCompanyName(inputString)}
                        companyEmail={companyEmail}
                        setCompanyEmail={(inputString) => setCompanyEmail(inputString)}
                        password={password}
                        setPassword={(inputString) => setPassword(inputString)}
                        verifiedPassword={verifyPassword}
                        setVerifiedPassword={(inputString) => setVerifyPassword(inputString)}
                    />
                    <RegisterCompanyInfo
                        streetAddress={streetAddress}
                        setStreetAddress={setStreetAddress}
                        city={city} setCity={setCity}
                        state={state} setState={setState}
                        zipcode={zipcode}
                        setZipcode={setZipcode}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        stateOptions={stateOptions}
                    />
                    <RegisterButtonContainer onRegisterButtonClick={() => onRegister()} errorMessage={errorMessage} buttonCopy={buttonCopy} />
                </Stack>
            </Box>
        </ThemeProvider>
    );
}
