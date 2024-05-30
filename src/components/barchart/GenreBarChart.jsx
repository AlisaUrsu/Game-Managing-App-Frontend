import "./GenreBarChart.styles.css";
import Chart from 'chart.js/auto';
import {useEffect, useRef, useState} from "react";
import * as GamesApi from "../../network/games_api"
Chart.defaults.color = '#fff'
const GenreBarChart = () => {
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

        async function getGenres() {

        }
        

        const labels = Object.keys(genresData);
        const counts = Object.values(genresData);

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Games Count by Genres',
                    data: counts,
                    backgroundColor: 'rgba(174,85,234,1)',
                    borderColor: 'rgba(174,85,234,1)',
                    borderWidth: 1,
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

export default GenreBarChart;
