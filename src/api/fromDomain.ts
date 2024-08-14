import { LogData } from "@/models";

export function parseLogData(logString: string) {
    // Split the log string into individual lines
    const lines = logString.trim().split('\n');

    // Define a regular expression to match the log format
    const logPattern = /^(\S+) \S+ \S+ \[([\w:/]+\s[+-]\d{4})\] "(GET|POST|PUT|DELETE) ([^"]+)" (\d{3}) \d+ "-" "([^"]+)"/;

    // Parse each line and convert it into an object
    const logData = lines.map(line => {
        const match = line.match(logPattern);

        if (match) {
            return {
                ipAddress: match[1],
                timestamp: match[2],
                method: match[3],
                request: match[4],
                statusCode: parseInt(match[5], 10),
                userAgent: match[6]
            };
        } else {
            console.error(`Line didn't match the expected format: ${line}`);
            return null;
        }
    }).filter((entry): entry is LogData => entry !== null);

    return logData;
}