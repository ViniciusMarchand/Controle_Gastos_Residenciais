import { useUserFormContext } from "~/contexts/user-form-context";
import List from "../common/list";
import { useEffect } from "react";
import UserCard from "./user-card";

export default function UserList() {
    const { users, findUsers } = useUserFormContext();
    
    useEffect(() => {
        (async () => {
            await findUsers();
        })()
    },[]);
    
    return <div className="flex gap-3.5 flex-wrap flex-row">
		<List items={users} itemProp="user" compoenent={UserCard}></List>
	</div>
}