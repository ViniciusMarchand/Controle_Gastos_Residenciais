import { useContext } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label"
import { useUserFormContext } from "~/contexts/user-form-context";
import { deleteUser } from "~/apis/UserApi";

interface Props {
    user: User
}

export default function UserCard({ user } : Props) {
    const {id, name, age} = user;

    const { setUserToEdit, findUsers } = useUserFormContext();

    const removeUser = async () => {
        await deleteUser(id);
        await findUsers();
    }

    return <div className="border shadow-2xl bg-background w-50 h-36 flex flex-col justify-center p-3 gap-4 rounded-md">
        <Label className="text-md">Nome: {name}</Label>
        <Label className="text-md">idade: {age}</Label>

        <div>
            <Button variant={'outline'} onClick={() => setUserToEdit(user)}>Editar</Button>
            <Button variant={'outline'} onClick={() => removeUser()}>Deletar</Button>
        </div>
    </div>
}