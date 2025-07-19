import {Apprentice, ApprenticeCreate, ApprenticeFind, ApprenticeUpdate} from "@/types/apprentice";

export const createApprentice = async (apprentice: ApprenticeCreate) => {
    try{
        const response = await fetch(`/api/Apprentices/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apprentice)
        })
        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

    } catch(error){
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}

export const getAllApprentices = async () => {
    try{
        const response = await fetch(`/api/Apprentices/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

    } catch(error){
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
};

export const findApprentices = async (apprenticeQuery: ApprenticeFind) => {
    const queryParams = new URLSearchParams()

    if (apprenticeQuery.startDate) {
        queryParams.append('startDate', apprenticeQuery.startDate.toISOString())
    }
    if (apprenticeQuery.status){
        queryParams.append('status', apprenticeQuery.status)
    }
    if (apprenticeQuery.apprenticeProgram){
        queryParams.append('apprenticeProgram', apprenticeQuery.apprenticeProgram)
    }
    if (apprenticeQuery.directorate){
        queryParams.append('directorate', apprenticeQuery.directorate)
    }

    try{
        const response = await fetch(`/api/Apprentices/find${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

    } catch(error){
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}

export const updateApprentice = async (updatedapprentice: ApprenticeUpdate) => {
    try{
        const response = await fetch(`/api/Apprentices`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedapprentice)
        })
        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

    } catch(error){
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}

export const deleteApprentice = async (apprenticeId: string) => {
    try {
        const response = await fetch(`/api/Apprentices/${apprenticeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}