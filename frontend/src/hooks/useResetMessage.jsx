// Redux
import { resetAuthStates } from "@src/slices/authSlice";
import { resetUserStates } from "@src/slices/userSlice";
import { resetAddressStates } from "@src/slices/addressSlice";
import { resetAccountStates } from "@src/slices/accountSlice";

export const useResetAuthMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetAuthStates());
        }, 3000)
    }
}

export const useResetUserMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetUserStates());
        }, 3000)
    }
}

export const useResetAddressMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetAddressStates());
        }, 3000)
    }
}

export const useResetAccountMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetAccountStates());
        }, 3000)
    }
}
