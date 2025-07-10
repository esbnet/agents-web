const formatter = new Intl.RelativeTimeFormat("pt-BR", {
    numeric: "auto",
    style: "long",
});

export function formatTimeToNow(date: Date) {
    const now = Date.now();
    const diffInSeconds = Math.round((date.getTime() - now) / 1000);

    const absDiff = Math.abs(diffInSeconds);

    let value: number;
    let unit: Intl.RelativeTimeFormatUnit;

    if (absDiff < 60) {
        value = diffInSeconds;
        unit = "second";
    } else if (absDiff < 3600) {
        value = Math.round(diffInSeconds / 60);
        unit = "minute";
    } else if (absDiff < 86400) {
        value = Math.round(diffInSeconds / 3600);
        unit = "hour";
    } else {
        value = Math.round(diffInSeconds / 86400);
        unit = "day";
    }

    return formatter.format(value, unit);
}