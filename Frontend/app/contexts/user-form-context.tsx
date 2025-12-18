import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { getUsers } from "~/apis/UserApi";

interface ContextProp {
    setUserToEdit: Function
    userToEdit: null | User,
    findUsers: Function,
    users:User[]
}

export const UserFormContext = createContext<ContextProp>({setUserToEdit: () => {}, userToEdit:null, findUsers: ()=>{}, users:[]});

export default function UserFormProvider ({ children }: { children: ReactNode }) {

    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const [users, setUsers] = useState<User[]>([]);

	const findUsers = useCallback(() => {
		(async () => {
			const res = await getUsers();
			setUsers(res?.data ?? []);
		})();
	}, []);

    return (
        <UserFormContext value={{setUserToEdit, userToEdit, users, findUsers}}>
            {children}
        </UserFormContext>
    );
};

export const useUserFormContext = () => {
    return useContext(UserFormContext);
}