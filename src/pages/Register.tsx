import {Stack, Box, ThemeProvider, IconButton} from "@mui/material";
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
import {validate_password} from "../services/utilities";
import {useRefData} from "../services/useRefDataServices";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

export const Register = ({ isUserSettings = false }:{ isUserSettings?: boolean }) => {

    const { getStates } = useRefData()
    const { postAdmin } = useAdmin();
    const user = useSelector(selectUser);
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
    const [ currentSlide, setCurrentSlide ] = useState<number>(0);

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
                        userId: response.userId,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        companyName: response.companyName,
                        email: response.email,
                        phoneNumber: response.phoneNumber,
                        address: {
                            streetAddress: response.address.streetAddress,
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

    const nextSlide = () => {
        if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const clearAllFields = () => {
        setFirstName("");
        setLastName("");
        setCompanyName("");
        setCompanyEmail("");
        setPassword("");
        setVerifyPassword("");
        setStreetAddress("");
        setCity("");
        setState("");
        setZipcode("");
        setPhoneNumber("");
        setErrorMessage("");
        setCurrentSlide(0);
    };

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
            (option) => option.stateName === currentUser.address.state
        )?.stateName
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
                    spacing={3}
                    sx={{
                        backgroundColor: colors.white,
                        width: { sm: "70%", lg: "40%", xl: "25%" },
                        padding: "2rem",
                        borderRadius: "8px",
                        position: "relative",
                    }}
                >
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            zIndex: 2,
                            backgroundColor: colors.secondaryColor
                        }}
                    >
                        <CloseIcon onClick={() => {
                            clearAllFields()
                            user ? navigate("/dashboard") : navigate("/")
                        }} />
                    </IconButton>
                    <Box
                        sx={{
                            overflow: "hidden",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                width: "200%",
                                transform: `translateX(-${currentSlide * 50}%)`,
                                transition: "transform 0.3s ease-in-out",
                            }}
                        >
                            <Box sx={{ width: "50%", paddingRight: "2rem" }}>
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
                            </Box>
                            <Box sx={{ width: "50%", paddingLeft: "2rem" }}>
                                <Stack spacing={3}>
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
                                    <RegisterButtonContainer
                                        onRegisterButtonClick={() => onRegister()}
                                        errorMessage={errorMessage}
                                        buttonCopy={buttonCopy}
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "1rem",
                        }}
                    >
                        <IconButton
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            sx={{
                                visibility: currentSlide === 0 ? 'hidden' : 'visible',
                                backgroundColor: colors.secondaryColor,
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                            }}
                        >
                            {[0, 1].map((slide) => (
                                <Box
                                    key={slide}
                                    sx={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: currentSlide === slide ? "primary.main" : "grey.300",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                    }}
                                    onClick={() => setCurrentSlide(slide)}
                                />
                            ))}
                        </Box>
                        <IconButton
                            onClick={nextSlide}
                            disabled={currentSlide === 1}
                            sx={{
                                visibility: currentSlide === 1 ? 'hidden' : 'visible',
                                backgroundColor: colors.secondaryColor,
                            }}
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </Box>
        </ThemeProvider>
    );
}