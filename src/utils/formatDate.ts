export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-RO",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "Europe/Bucharest" // Set the time zone to Romania
        });
}

export function formatSimpleDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-RO",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "Europe/Bucharest" // Set the time zone to Romania
    });
}