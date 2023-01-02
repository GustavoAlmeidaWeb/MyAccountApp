// Redux
import { resetAuthStates } from "@src/slices/authSlice";
import { resetUserStates } from "@src/slices/userSlice";

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
