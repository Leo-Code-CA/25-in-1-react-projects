const dummyApiResponse = {
    showLightAndDarkMode: false,
    showTicTacToeBoard: true,
    showRandomColorGenerator: true,
    showAccordion: false,
    showtreeView: true
};

export default function featureFlagsDataServiceCall() {

    return new Promise((resolve, reject) => {
        if (dummyApiResponse) {
            setTimeout(() => {
                resolve(dummyApiResponse);
            }, 1000);
        } else {
            reject('Some error occured! Please try again!');
        }
    });
}