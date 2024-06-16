export const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    100;
    const lightness = Math.floor(Math.random() * 20) + 70;

    const color = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
    return color;
};
