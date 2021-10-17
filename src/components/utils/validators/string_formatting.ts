export function dateReformat(date_ISO_8601: string) {
    const options:any = {year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(date_ISO_8601)
    return  date.toLocaleDateString("ru-RU",options)
}

export function countReformat1(num:string) {
    return num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1 `);
}
export function countReformat2 (num:string) {
    const nemReformat = countReformat1(num)
    const parts = nemReformat.split(" ");
    return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length-1)) + " " + ["тыс.", "млн", "млрд"][parts.length-2]) : parts[0];
}

export function stringReformat(string:string){
    try{
        const url_regex = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
        return  string.replace(/\n/g, '<br/>').replace(url_regex, "<a target='_blank' href=\"$1\">$1</a>")

    }
    catch (error){
        return string
    }
  }





