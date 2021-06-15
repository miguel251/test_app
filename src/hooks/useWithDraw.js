import { useSelector } from "react-redux"

const useWithdraw  = () => {
    return useSelector(state => state.withdraw);
}

export default useWithdraw;