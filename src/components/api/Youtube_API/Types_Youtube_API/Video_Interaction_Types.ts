
export interface VideoAbuseReportReasonListResponse {
    kind: 'youtube#videoAbuseReportReasonListResponse'
    etag: string
    items:Array<VideoAbuseReportReason>
}
interface VideoAbuseReportReason{
    kind: "youtube#videoAbuseReportReason"
    etag: string
    id: string
    snippet: {
        label: string
        secondaryReasons?:Array<{
            id: string
            label: string
        }>
    }
}