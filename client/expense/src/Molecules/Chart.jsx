import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ type, labels, data, chartLabel, backgroundColor, borderColor, hoverBackgroundColor }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);


    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: chartLabel,
                    backgroundColor: backgroundColor || "#4e73df",
                    hoverBackgroundColor: hoverBackgroundColor || "#2e59d9",
                    borderColor: borderColor || "#4e73df",
                    data: data,
                }],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },

            }
        });

    }, [type, labels, data, chartLabel, backgroundColor, hoverBackgroundColor, borderColor]);

    return (

        <canvas ref={chartRef} height={100}></canvas>

    );
}

export default ChartComponent;
