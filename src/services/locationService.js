

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {


        if (!navigator.geolocation) {
            alert("Geolocation tidak didukung");

            reject({
                code: -1,
                message: "Browser tidak mendukung Geolocation.",
            });

            return;
        }


        navigator.geolocation.getCurrentPosition(
            (position) => {


                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });

            },
            (error) => {


                reject({
                    code: error.code,
                    message: error.message,
                });

            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0,
            }
        );

    });
}
// Haversine Formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};