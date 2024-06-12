import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import ActuinCreators from '../store/actions-creators'

export const useActions = () => {
    const dispath = useDispatch()
    return bindActionCreators(ActuinCreators, dispath)
}