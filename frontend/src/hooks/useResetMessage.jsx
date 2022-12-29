// Redux
import { resetAuthStates } from "@src/slices/authSlice";

export const useResetAuthMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetAuthStates());
        }, 3000)
    }
}
