import React from "react";

const sample = [
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

const Sample = () => {
    const CANVAS_SIZE = 128;
    const BASE_SIZE = 256;
    const RATIO = CANVAS_SIZE / BASE_SIZE;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const draw = () => {
        const ctx = canvasRef.current!.getContext("2d");
        if (!ctx) return;
        ctx.strokeStyle = "black";
        const drawLine = (
            startX: number,
            startY: number,
            endX: number,
            endY: number
        ) => {
            [startX, startY, endX, endY] = [startX, startY, endX, endY].map(
                x => x * RATIO
            );
            let amount = 0.0;
            setInterval(function () {
                amount += 0.1;
                amount = Math.min(amount, 1);
                ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                ctx.moveTo(startX, startY);
                ctx.lineTo(
                    startX + (endX - startX) * amount,
                    startY + (endY - startY) * amount
                );
                ctx.stroke();
            }, 30);
        };
        ctx.beginPath();
        for (const stroke of sample) {
            for (let i = 0; i < stroke[0].length - 1; i++) {
                drawLine(
                    stroke[0][i],
                    stroke[1][i],
                    stroke[0][i + 1],
                    stroke[1][i + 1]
                );
            }
        }
    };
    React.useEffect(() => {
        draw();
    }, []);

    return (
        <canvas
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="bg-white"
            ref={canvasRef}
        />
    );
};

export default Sample;
