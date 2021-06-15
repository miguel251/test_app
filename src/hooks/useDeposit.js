import { useSelector } from "react-redux"

const useDeposit  = () => {
    return useSelector(state => state.deposit);
}

export default useDeposit;
