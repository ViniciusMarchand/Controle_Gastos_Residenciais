import { useEffect, useState } from "react";
import { postCategory, putCategory } from "~/apis/CategoryApi";
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
import { useCategoryFormContext } from "~/contexts/category-form-context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
    state: "Add" | "Edit" | "Closed";
    onClose: Function;
}

export function CategoryForm({ state, onClose }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [stateName, setStateName] = useState<"Adicionar" | "Editar">(
        "Adicionar"
    );
    const [form, setForm] = useState<CategoryDTO>({
        description: "",
        type: 0,
    });

    const { setCategoryToEdit, categoryToEdit, findCategories } =
        useCategoryFormContext();

    useEffect(() => {
        if (state === "Add" || state === "Edit" || categoryToEdit) {
            setIsOpen(true);
            setStateName(state === "Add" ? "Adicionar" : "Editar");
            if (state === "Add") {
                setCategoryToEdit(null);
            } else if (categoryToEdit) {
                setForm({
                    description: categoryToEdit?.description,
                    type: categoryToEdit?.type,
                });
            }
        } else {
            setIsOpen(false);
        }
    }, [state, categoryToEdit]);

    const handleOnClose = (newIsOpen: boolean) => {
        setIsOpen(newIsOpen);
        setCategoryToEdit(null);
        onClose();
    };

    const submit = async () => {
        try {
            if (state === "Add") {
                await postCategory(form);
            } else if (categoryToEdit) {
                await putCategory(categoryToEdit.id, form);
            }
            findCategories();
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
                        <DialogTitle>{stateName} categoria</DialogTitle>
                        <DialogDescription>
                            Crie uma categoria para suas transações.
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
                                        <SelectItem value="2">Ambos</SelectItem>
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
