/* eslint-disable max-lines-per-function */
import 'chartjs-adapter-date-fns'

import React, { useEffect,useRef, useState  } from 'react'
import { Line } from 'react-chartjs-2'
import { Checkbox,Input,Typography } from 'antd'
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

const { Title: TypoTitle } = Typography

  Chart.register(LineController, LineElement, PointElement, LinearScale, ChartTitle, Tooltip, Legend, CategoryScale, TimeScale)

const HistoryChart = ({ data }) => {

    const [isRendered, setIsRendered] = useState(false)
    const [timeFormat, setTimeFormat] = useState('24h')
    const [mode, setMode] = useState(true)

    const chartRef = useRef()
    const { day, week, year, detail } = data

    const onChange = e => {
      console.log(`checked = ${e.target.checked}`)
    }

/*
TODO: IMPLEMENT DARKMODE

useEffect(() => {

  const darkMode = Checkbox => {
    !setMode()
  }
}) */

// console.log(detail)

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
} else (!isRendered && chartStatus && detail)



        {



            const myChart = new Chart(chartRef.current, {
                type: 'line',
                data: {
                  datasets: [{
                    label: `${detail?.name} price`,
                    backgroundColor: 'black',
                    borderColor: '#5AC53B',
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointHoverBackgroundColor: '#5AC53B',
                    pointHoverBorderColor: '#000000',
                    pointHoverBorderWidth: 4,
                    pointHoverRadius: 6,

                      data:  determineTimeFormat() ,
                      pointRadius: 0,
                      borderWidth: 2,
                  }],
              },
                options: {
                  plugins: {
                  legend: {
                    display: false,
                  },
                },
                  hover: {
                    intersect: false,
                  },
                  elements: {
                    line: {
                      tension: 0,
                    },
                  },
                  tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                    },
                  },
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
                      yAxes: {

                        beginAtZero: false,
                        type: 'linear',
                        ticks: {
                          display: false,
                        },
                        grid: {
                          display:false,
                        },
                      },
                      xAxes:
                        {
                          type: 'time',
                          time: {
                            format: 'MM/DD/YY',
                          },
                          ticks: {
                            display: false,
                          },
                          grid: {
                            display:false,
                          },

                        },
                    },
                  },
            })

            setIsRendered(true)
    };
},[timeFormat, year, week, day, isRendered])

const renderPrice = () => {
  if (detail)
    return (
      <>
        <p className="my-0">${detail.current_price.toFixed(2)}</p>
        <p
          className={
            detail.price_change_24h < 0
              ? 'text-danger my-0'
              : 'text-success my-0'
          }
        >
          {detail.price_change_percentage_24h.toFixed(2)}%
        </p>
      </>
    )

}



return(


    <div className='bg-white border mt-2 rounded p-3'>
        <div></div>

    <div>
        <canvas ref={chartRef} id='mychart' width={500} height={500} ></canvas>
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

