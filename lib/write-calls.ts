export const exampleWriteCall= async () =>{
    try{
        const response = await fetch(`https://13.60.83.197:3210/questions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "test",
                description: "test",
                status: "draft",
            })
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