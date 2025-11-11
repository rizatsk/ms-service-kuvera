import { v7 } from "uuid"

const uuidGen = ():string => {
    return v7();
}

export default uuidGen;
