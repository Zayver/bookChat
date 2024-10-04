import { PromptRequest } from "./prompt-request";
import { PromptResponse } from "./prompt-response";

export interface Prompt{
    input: PromptRequest
    output: PromptResponse
}