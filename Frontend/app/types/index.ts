type User = {
    id: string
    name: string
    age: number | string
}

type UserDTO = Omit<User, 'id'>

type Category = {
    id: string
    description: string
    type: number | string
}

type CategoryDTO = Omit<Category, 'id'>

type Transaction = {
    id: string
    description: string
    value: number | string
    type: number | string
    userId: string
    categoryId: string 
    userName?: string
    categoryDescription?: string
}

type TransactionDTO = Omit<Transaction, 'id'>

type CategoryResponseDTO = {
    category: Category
    income: number
    expense: number
    balance: number
}

type UserResponseDTO = {
    user: User
    income: number
    expense: number
    balance: number
}

type CategoryDetailsResponseDTO = {
    categoriesDetails: CategoryResponseDTO[]
    totalIncome: number
    totalExpense: number
    totalBalance: number
}

type UserDetailsResponseDTO = {
    usersDetails: UserResponseDTO[]
    totalIncome: number
    totalExpense: number
    totalBalance: number
}


