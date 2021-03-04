function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const initialState = {
    loginForm: {
        values: {
            email: "",
            password: ""
        },
        errors: {
            email: "",
            password: ""
        }
    }
};

const setErrors = (email, password) => {
    let errors = { email: "", password: "" };
    if (!email && email.length === 0) {
        errors.email = "Email is required";
    } else if (!validateEmail(email)) {
        errors.email = "Email is invalid";
    }
    if (!password && password.length === 0) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must have 8 characters";
    }
    return errors;
};

export default (state = initialState, action) => {
    if (action.type === "FORM_SUBMIT") {
        const { email, password } = action.payload;
        const values = {
            email,
            password
        };
        const errors = setErrors(email, password);
        return {

            loginForm: {
                values,
                errors
            }

        };

    }
    return state;
};