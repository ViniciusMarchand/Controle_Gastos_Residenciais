import { useEffect, useState } from "react";
import { postUser, putUser } from "~/apis/UserApi";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUserFormContext } from "~/contexts/user-form-context";

interface Props {
    state: "Add" | "Edit" | "Closed",
    onClose: Function 
}

export function UserForm({state, onClose} : Props) {

    const [isOpen, setIsOpen] = useState(false);
    const [stateName, setStateName] = useState<"Adicionar" | "Editar">("Adicionar");
    const [form, setForm] = useState<UserDTO>({
        name: "",
        age: 18,
    });

    const { setUserToEdit, userToEdit, findUsers } = useUserFormContext();

    useEffect(() => {

        if(state === "Add" || state === "Edit" || userToEdit) {
            setIsOpen(true);
            setStateName(state === "Add" ? "Adicionar" : "Editar");
            if(state === "Add") {
                setUserToEdit(null);
            } else if (userToEdit){
                setForm({
                    age: userToEdit?.age,
                    name: userToEdit?.name,
                })
            }
        } else {
            setIsOpen(false);
        }
    },[state, userToEdit]);

    const handleOnClose = (newIsOpen:boolean) => {
        setIsOpen(newIsOpen);
        setUserToEdit(null);
        onClose();
    }

    const submit = async () => {
        try {
            if(state === "Add") {
                await postUser(form);
            } else if(userToEdit){
                await putUser(userToEdit.id, form);
            }
            findUsers();

        } catch (error:any) {
            console.error(error.message);
        } finally {
            handleOnClose(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOnClose}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{stateName} usuário</DialogTitle>
                        <DialogDescription>
                            Crie um usuário para poder gerenciar as suas transações.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nome</Label>
                            <Input id="name" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="age">Idade</Label>
                            <Input id="age" type="number" name="age" value={form.age} onChange={(e) => !isNaN(parseInt(e.target.value)) ? setForm({...form, age: e.target.value}) : setForm({...form, age: ""})} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => submit()}>{stateName}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
