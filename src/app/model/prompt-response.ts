export interface PromptResponse{
    message: string
    audio: string | null
    candidates: Candidates[]
}

export interface Candidates{
    message: string
    book: string 
    bookUrl: string
}