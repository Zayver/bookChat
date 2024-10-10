export interface PromptResponse{
    text: string
    audio_url: string | null
    fragment_distance: Candidate
}

export type FragmentDistance = [string, string, number, number, string]
export type Candidate = FragmentDistance[] | "None"