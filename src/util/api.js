export default function GetEnvironmentData (count = 20) {
    return fetch('http://krimthered.ddns.net/api/history/' + count);
}