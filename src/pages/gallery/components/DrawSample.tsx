import React from "react";
import {Grid, GridProps} from "@mui/material";

import styles from "../../../assets/styles/Gallery.module.scss";

type Props = {
    strokes: string;
};

const DrawSample = ({strokes, ...others}: Props & GridProps) => {
    const SAMPLE_SIZE = 128;
    const BASE_SIZE = 256;
    const RATIO = SAMPLE_SIZE / BASE_SIZE;

    const drawPaths = () => {
        const lines: React.ReactNode[] = [];
        const intStrokes: number[][][] = JSON.parse(strokes);

        for (let i = 0; i < intStrokes.length; i++) {
            const points: string[] = [];
            const stroke = intStrokes[i];
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
        return lines;
    };

    return (
        <Grid
            item
            width={SAMPLE_SIZE}
            height={SAMPLE_SIZE}
            className="mb-2 ml-2"
            {...others}
        >
            <svg className="w-full h-full">{strokes && drawPaths()}</svg>
        </Grid>
    );
};

export default DrawSample;
