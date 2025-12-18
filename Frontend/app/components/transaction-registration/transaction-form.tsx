import { useEffect, useState } from "react";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useTransactionFormContext } from "~/contexts/transaction-form-context";
import { postTransaction, putTransaction } from "~/apis/TransactionApi copy";
import { getUsers } from "~/apis/UserApi";
import { getCategories } from "~/apis/CategoryApi";
import { toast } from "sonner";

interface Props {
    state: "Add" | "Edit" | "Closed";
    onClose: Function;
}

export function TransactionForm({ state, onClose }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [stateName, setStateName] = useState<"Adicionar" | "Editar">(
        "Adicionar"
    );
    const [form, setForm] = useState<TransactionDTO>({
        description: "",
        type: 0,
        categoryId: "0",
        userId: "0",
        value: "0",
    });

    const { setTransactionToEdit, transactionToEdit, findTransactions } =
        useTransactionFormContext();

    useEffect(() => {
        if (state === "Add" || state === "Edit" || transactionToEdit) {
            setIsOpen(true);
            setStateName(state === "Add" ? "Adicionar" : "Editar");
            if (state === "Add") {
                setTransactionToEdit(null);
            } else if (transactionToEdit) {
                setForm({
                    description: transactionToEdit.description,
                    type: transactionToEdit.type,
                    userId: transactionToEdit.userId,
                    value: transactionToEdit.value,
                    categoryId: transactionToEdit.categoryId,
                });
            }
        } else {
            setIsOpen(false);
        }
    }, [state, transactionToEdit]);

    useEffect(() => {
        (async () => {
            const resUser = await getUsers();
            const resCategory = await getCategories();
            setUsers(resUser?.data ?? []);
            setCategories(resCategory?.data ?? []);
        })();
    },[]);

    const handleOnClose = (newIsOpen: boolean) => {
        setIsOpen(newIsOpen);
        setTransactionToEdit(null);
        onClose();
    };

    const submit = async () => {
        try {
            const user = users.find((user) => user.id === form.userId);
            
            if(user && parseInt(user.age as string) < 18 && form.type == "1") {
                
                toast.error("Usuário menor de idade não pode ter receita.")
                return;
            }

            const newForm = {...form}
            newForm.value = parseFloat(newForm.value as string);
            setForm(newForm);
            if (state === "Add") {
                await postTransaction(newForm);
            } else if (transactionToEdit) {
                await putTransaction(transactionToEdit.id, newForm);
            }
            findTransactions();
        } catch (error: any) {
            console.error(error.message);
        } finally {
            handleOnClose(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOnClose}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{stateName} transação</DialogTitle>
                        <DialogDescription>
                            Registre uma transação.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="description">Descrição</Label>
                            <Input
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="value">Valor</Label>
                            <Input
                                id="value"
                                name="value"
                                type="number"
                                value={form.value.toString()}
                                onChange={(e) =>
                                    setForm({ ...form, value: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="type">Tipo</Label>
                            <Select value={form.type.toString()} onValueChange={(value) => !isNaN(parseInt(value)) ? setForm({...form, type: parseInt(value)}) : setForm({...form, type: 0})}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tipos</SelectLabel>
                                        <SelectItem value="0">Despesa</SelectItem>
                                        <SelectItem value="1">Renda</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                          <div className="grid gap-3 max-w-full overflow-hidden">
                            <Label htmlFor="userId">Usuário</Label>
                            <Select value={form.userId} onValueChange={(value) => setForm({...form, userId: value})}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Selecione o usuário</SelectLabel>
                                        {
                                            users.map((user) => (
                                                <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                          <div className="grid gap-3">
                            <Label htmlFor="categoryId">Categoria</Label>
                            <Select value={form.categoryId} onValueChange={(value) => setForm({...form, categoryId: value})}>
                                <SelectTrigger className="w-full max-w-full overflow-hidden">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Selecione a categoria</SelectLabel>
                                        {
                                            categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.description}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => submit()}>
                            {stateName}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
