
export const getBase64 = (file) => {
    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.addEventListener("load", () => resolve(String(reader.result)));
        reader.readAsDataURL(file);
    });
};

const sizes = [
    [755, 450],
    [365, 450],
    [365, 212],
    [380, 380]
];

export const resize = (item) => {

    const { imgFile, imgUrl } = item;

    let img = document.getElementById('imageListItem');
    let imgItem = new Image();
    imgItem.src = imgUrl.value;
    imgItem.name = imgFile.name;
    imgItem.size = imgFile.size;
    for (let idx = 0; idx < sizes.length; idx++) {
        let elem = (document.getElementById(idx));
        elem.setAttribute('width', sizes[idx][0]);
        elem.setAttribute('height', sizes[idx][1]);
        elem.getContext('2d').drawImage(img, 0, 0, elem.width, elem.height);
        console.log('sasgahsa ' +  document.getElementById('img-wrapper'));
        document.getElementById('img-wrapper').appendChild(elem);
    }
}