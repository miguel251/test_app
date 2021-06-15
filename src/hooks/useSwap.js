import { useSelector } from "react-redux"

const useSwap  = () => {
    return useSelector(state => state.swap);
}

export default useSwap;
