import "./GenreBarChart.styles.css";
import Chart from 'chart.js/auto';
import {useEffect, useRef, useState} from "react";
import * as GamesApi from "../../network/games_api"

export const GenreLineChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [genresData, setGenresData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const data = await GamesApi.getChartData();
                setGenresData(data);
            } catch (error) {
                console.error("Failed to fetch chart data:", error);
            }
        };

        fetchChartData();
    }, []);
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = Object.keys(genresData);
        const counts = Object.values(genresData);

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    data: counts,
                    backgroundColor: 'rgba(96,213,228,1)',
                    borderColor: 'rgba(96,213,228,1)',
                    borderWidth: 3,
                }]
            },
            options: {

                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Genres'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [genresData]);


    return (
        <div>

            <canvas ref={chartRef} height={130}/>

        </div>
    );
}

;