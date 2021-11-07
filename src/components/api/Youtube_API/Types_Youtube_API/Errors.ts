export interface YoutubeResponseError {
    error: {
        code: number
        message: string
        errors: Array<{
            domain: string
            reason: string
        }>
        status: string
    }
}

