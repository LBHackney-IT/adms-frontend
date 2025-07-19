import {Apprentice, ApprenticeCreate, ApprenticeFind, ApprenticeUpdate} from "@/types/apprentice";
import {
    Achievement,
    ApprenticeshipProgram,
    CertificateStatus,
    Classification,
    DirectorateCode,
    Ethnicity,
    Gender,
    NonCompletionReason,
    ProgressionTracker,
} from "@/types/enums";

// went back and forth on this for quite a while and decided that i personaly perfer to
// handle the enums as their actual values on the frontend and database
// used AI to help me with helper function that converts enums
const convertApprenticeEnumsForApi = (apprentice: ApprenticeCreate | ApprenticeUpdate): ApprenticeCreate | ApprenticeUpdate => {
    const converted: ApprenticeCreate | ApprenticeUpdate = { ...apprentice };

    
    if (converted.apprenticeAchievement) {
        const index = Object.values(Achievement).indexOf(converted.apprenticeAchievement as Achievement);
        if (index > -1) converted.apprenticeAchievement = index;
    }
    if (converted.apprenticeClassification) {
        const index = Object.values(Classification).indexOf(converted.apprenticeClassification as Classification);
        if (index > -1) converted.apprenticeClassification = index;
    }
    if (converted.apprenticeEthnicity) {
        const index = Object.values(Ethnicity).indexOf(converted.apprenticeEthnicity as Ethnicity);
        if (index > -1) converted.apprenticeEthnicity = index;
    }
    if (converted.apprenticeGender) {
        const index = Object.values(Gender).indexOf(converted.apprenticeGender as Gender);
        if (index > -1) converted.apprenticeGender = index;
    }
    if (converted.apprenticeNonCompletionReason) {
        const index = Object.values(NonCompletionReason).indexOf(converted.apprenticeNonCompletionReason as NonCompletionReason);
        if (index > -1) converted.apprenticeNonCompletionReason = index;
    }
    if (converted.apprenticeProgram) {
        const index = Object.values(ApprenticeshipProgram).indexOf(converted.apprenticeProgram as ApprenticeshipProgram);
        if (index > -1) converted.apprenticeProgram = index;
    }
    if (converted.apprenticeProgression) {
        const index = Object.values(ProgressionTracker).indexOf(converted.apprenticeProgression as ProgressionTracker);
        if (index > -1) converted.apprenticeProgression = index;
    }
    if (converted.certificatesReceived) {
        const index = Object.values(CertificateStatus).indexOf(converted.certificatesReceived as CertificateStatus);
        if (index > -1) converted.certificatesReceived = index;
    }
    if (converted.directorate) {
        const index = Object.values(DirectorateCode).indexOf(converted.directorate as DirectorateCode);
        if (index > -1) converted.directorate = index;
    }

    return converted;
};

export const createApprentice = async (apprentice: ApprenticeCreate) => {
    try{
        const apprenticeForApi = convertApprenticeEnumsForApi(apprentice);
        console.log("Data being sent:", JSON.stringify(apprenticeForApi, null, 2));
        const response = await fetch(`/api/Apprentices/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apprenticeForApi)
        })
        if (response.ok) {
            await response.json();
            return null;
        } else {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
        }

    } catch(error){
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}

export const getAllApprentices = async () : Promise<Apprentice[] | undefined> => {
    try{
        const response = await fetch(`/api/Apprentices/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const result = (await response.json()) as Apprentice[]
            return result
        } else {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
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
        const index = Object.values(ApprenticeshipProgram).indexOf(apprenticeQuery.apprenticeProgram as ApprenticeshipProgram);
        if (index > -1) queryParams.append('apprenticeProgram', index.toString())
    }
    if (apprenticeQuery.directorate){
        const index = Object.values(DirectorateCode).indexOf(apprenticeQuery.directorate as DirectorateCode);
        if (index > -1) queryParams.append('directorate', index.toString())
    }
    console.log("Query params:", queryParams.toString());
    try{
        const response = await fetch(`/api/Apprentices/find?${queryParams.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
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
    console.log("Data being sent:", JSON.stringify(convertApprenticeEnumsForApi(updatedapprentice), null, 2));
    try{
        const apprenticeForApi = convertApprenticeEnumsForApi(updatedapprentice);
        const response = await fetch(`/api/Apprentices`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apprenticeForApi)
        })
        if (response.ok) {
            const result = await response.json()
            console.log("Result:", result);
        } else {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
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
            console.log("Result:", result);
        } else {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
        }

    } catch(error){
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}
