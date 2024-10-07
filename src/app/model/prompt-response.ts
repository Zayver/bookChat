export interface PromptResponse{
    text: string
    audio_url: string | null
    fragment_distance: FragmentDistance[]
}

export type FragmentDistance = [string, string, number, number, string]