export const getBooksFromServer = async (searchValue, page, signal) => {
    try {
        const response = await fetch("http://localhost:3000/api/books/get-books", {
            signal,
            method: "POST",
            body: JSON.stringify({searchValue, page}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("unable to get books"); 
        }
    
        const responseData = await response.json();

        return {
            books: responseData.data.books,
            length: responseData.data.length
        }
    } catch (error) {
        throw error;
    }
};