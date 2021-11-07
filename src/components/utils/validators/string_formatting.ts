import { countries_ISO_Russian} from "./Countries_ISO";

export function dateReformat(date_ISO_8601: string) {
    if(date_ISO_8601){
        const options = {year: 'numeric', month: 'long', day: 'numeric' } as const
        const date = new Date(date_ISO_8601)
        return  date.toLocaleDateString("ru-RU",options)
    }
    else return ''
}

export function countReformat1(num:string) {
    if(num)return num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1 `);
    else return ''
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

export function countryISOReformat(countryISO:string){
    try{
        let country = countries_ISO_Russian.find(a=>a.alpha2 === countryISO.toLowerCase())
        if(country) return country.name
    }
      catch (error){
        return countryISO
      }
}

export function truncateString( str:string, n:number, useWordBoundary:boolean ){
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1); // the original check
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + '...';
}



export function parseISO8601Duration(iso8601Duration:string) {
    const  iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;
    let matches = iso8601Duration.match(iso8601DurationRegex);
    if(matches){
        const durationObject = {
            sign: matches[1] === undefined ? '+' : '-',
            years: matches[2] === undefined ? 0 : matches[2],
            months: matches[3] === undefined ? 0 : matches[3],
            weeks: matches[4] === undefined ? 0 : matches[4],
            days: matches[5] === undefined ? 0 : matches[5],
            hours: matches[6] === undefined ? 0 : matches[6],
            minutes: matches[7] === undefined ? 0 : matches[7],
            seconds: matches[8] === undefined ? 0 : matches[8]
        }
        const{hours,minutes,seconds}=durationObject
        return `${hours===0 ? '' : hours+':'}${minutes===0 ?'00:': minutes+':'}${seconds===0 ?'00:': seconds}`
    }
   else return 'asd'
}