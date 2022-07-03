/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import 'chartjs-adapter-date-fns'

import React, { useEffect,useRef, useState  } from 'react'
import { Line } from 'react-chartjs-2'
import { Box, Button } from '@chakra-ui/react'
import { Checkbox,Input,Typography } from 'antd'
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    DateAdapter,
    Filler,
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

Chart.register(LineController, LineElement, PointElement, LinearScale, ChartTitle, Tooltip, Legend, CategoryScale, TimeScale, Filler)



    const PortfolioChart = ({ address, data }) => {



        const [isRendered, setIsRendered] = useState(false)
        const [timeFormat, setTimeFormat] = useState('24h')
        const [mode, setMode] = useState(true)

        const chartRef = useRef()
        const { hours, days, weeks, months, years } = data

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
              case 'h':
                return hours
              case 'd':
                return days
              case 'w':
                return weeks
              case 'm':
                return months
              case 'y':
                return years
              default:
                return days
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
                        fill: true,
                        label: `Total $`,
                        backgroundColor: 'rgba(63,156,73, 0.09)',
                        borderColor: '#3f9c49',
                        pointBackgroundColor: 'rgba(0,0,0,0)',
                        pointBorderColor: 'rgba(0, 0, 0, 0)',
                        pointHoverBackgroundColor: '#5AC53B',
                        pointHoverBorderColor: '#000000',
                        pointHoverBorderWidth: 4,
                        pointHoverRadius: 6,

                          data: determineTimeFormat(),
                          pointRadius: 0,
                          borderWidth: 2,
                      }],
                  },
                    options: {
                      plugins:
                      {
                       // tooltipline,
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
                              display: true,
                            },
                            grid: {
                              display:false,
                            },
                          },
                          xAxes:
                            {
                              type: 'time',
                              time: {
                                format: 'MM/DD/YYYY hh mm',
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
    },[data, days, hours, weeks, months, years, isRendered, timeFormat])

  /*  const renderPrice = () => {

      if (detail)
        return (
          <>
            <h1 className="my-0">${detail.current_price.toFixed(2)} ({detail.price_change_percentage_24h.toFixed(2)}%)</h1>
            <p
              className={
                detail.price_change_24h < 0
                  ? 'text-danger my-0'
                  : 'text-success my-0'
              }
            >

            </p>
          </>
        )

    }

    const renderDetail= () => {
      if (detail)
        return (
    <h1> <img
    src={detail?.image}
    width={35}
    height={35}
    />          {(detail?.symbol).toUpperCase()} </h1>
        )

    }

*/

    return(<Box className='yetturi'>

{data && isRendered &&
        <div className='bg-white border mt-2 rounded p-3'>


        <div>
            <canvas ref={chartRef} id='mychart' width={800} height={500} ></canvas>
        </div>



        <div className="chart-button mt-1">
            <Button
              onClick={() => setTimeFormat('h')}
              className="btn btn-outline-secondary btn-sm"
            >
              Hr
            </Button>
            <Button
              onClick={() => setTimeFormat('d')}
              className="btn btn-outline-secondary btn-sm mx-1"
            >
              D
            </Button>
            <Button
              onClick={() => setTimeFormat('w')}
              className="btn btn-outline-secondary btn-sm"
            >
              Wk
            </Button>
            <Button
              onClick={() => setTimeFormat('m')}
              className="btn btn-outline-secondary btn-sm"
            >
              M
            </Button>
            <Button
              onClick={() => setTimeFormat('y')}
              className="btn btn-outline-secondary btn-sm"
            >
              Yr
            </Button>
          </div>
        </div>
    }
        </Box>
    )
    }

    export default PortfolioChart






