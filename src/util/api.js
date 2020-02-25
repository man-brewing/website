export default function GetEnvironmentData (count = 20) {
    // for testing broken api
    // return new Promise((resolve) => {
    //     setTimeout(resolve, 1000);
    // });

    return fetch('http://krimthered.ddns.net/api/history/' + count);
}