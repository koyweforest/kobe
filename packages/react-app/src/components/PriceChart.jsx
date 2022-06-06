/* eslint-disable max-lines-per-function */
import 'chartjs-adapter-date-fns'

import React, { useEffect,useRef, useState  } from 'react'
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    DateAdapter,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    TimeScale,
    Title as ChartTitle,
    Tooltip,
  } from 'chart.js'
import { enUS } from 'date-fns/locale'

  Chart.register(LineController, LineElement, PointElement, LinearScale, ChartTitle, TimeScale)

const HistoryChart = ({ data }) => {

    const [isRendered, setIsRendered] = useState(false)
    const [timeFormat, setTimeFormat] = useState('24h')

    const chartRef = useRef()
    const { day, week,year } = data



    useEffect(() => {

      const determineTimeFormat = () => {
        switch (timeFormat) {
          case '24h':
            return day
          case '7d':
            return week
          case '1y':
            return year
          default:
            return day
        }
      }

        const chartStatus = Chart.getChart('mychart')




        // eslint-disable-next-line curly
        if (chartStatus !==undefined) {

            chartStatus.destroy()
            setIsRendered(false)
} else (!isRendered && chartStatus)

        {



            const myChart = new Chart(chartRef.current, {
                type: 'line',
                data: {
                  datasets: [{
                      label: '# of Votes',
                      data: determineTimeFormat(),
                      pointRadius: 0,
                      borderWidth: 1,
                  }],
              },
                options: {
                    lineHeightAnnotation: {
                      always: true,
                      hover: false,
                      lineWeight: 1.5,
                    },

                    animation: {
                      duration: 2000,
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                      xAxes:
                        {
                          type: 'time',
                          distribution: 'linear',
                        },
                    },
                  },
            })

            setIsRendered(true)
    };
},[timeFormat, year, week, day, isRendered])

return(
    <div className='bg-white border mt-2 rounded p-3'>
        <div></div>
    <div>
        <canvas ref={chartRef} id='mychart' width={1000} height={1000} />

    </div>
    <div className="chart-button mt-1">
        <button
          onClick={() => setTimeFormat('24h')}
          className="btn btn-outline-secondary btn-sm"
        >
          24h
        </button>
        <button
          onClick={() => setTimeFormat('7d')}
          className="btn btn-outline-secondary btn-sm mx-1"
        >
          7d
        </button>
        <button
          onClick={() => setTimeFormat('1y')}
          className="btn btn-outline-secondary btn-sm"
        >
          1y
        </button>
      </div>
    </div>
)
}

export default HistoryChart

