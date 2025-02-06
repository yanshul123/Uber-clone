import React, { createContext } from "react";

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

    return (
        <div>
           <UserDataContext.provider value={[user, setUser]}>
            {children}
           </UserDataContext.provider>
        </div>
    )
}
export default UserContext