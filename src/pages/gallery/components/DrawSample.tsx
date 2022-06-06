import React from "react";
import styles from "../../../assets/styles/Gallery.module.scss";

const drawSample = [
    [
        [43, 197, 255, 253, 243, 223, 178, 131, 102, 78, 35, 21, 4, 0, 50],
        [44, 40, 43, 53, 69, 86, 105, 110, 109, 104, 86, 75, 59, 46, 46],
    ],
    [
        [107, 107],
        [40, 39],
    ],
    [
        [38, 35, 89, 209, 208],
        [45, 4, 0, 11, 40],
    ],
];

type Props = {
    strokes: number[][][];
};

const SvgSample = ({strokes}: Props) => {
    const lines: React.ReactNode[] = [];
    const SAMPLE_SIZE = 128;
    const BASE_SIZE = 256;
    const RATIO = SAMPLE_SIZE / BASE_SIZE;

    for (let i = 0; i < strokes.length; i++) {
        const points: string[] = [];
        const stroke = strokes[i];
        for (let j = 0; j < stroke[0].length; j++) {
            points.push(`${stroke[0][j] * RATIO},${stroke[1][j] * RATIO}`);
        }
        lines.push(
            <path
                className={styles.path}
                key={i}
                d={`M${points.join(" ")}`}
                pathLength={1}
            />
        );
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {lines}
        </svg>
    );
};

export default SvgSample;
export {drawSample};
