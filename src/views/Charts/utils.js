import {getColorPalette} from "../../utils/colors";
import moment from "moment";

export const getOptions = ({pollutantUnit, xScales, yScales}) => {

    return {
        animations: false,
        showLine: false,
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fecha'
                },
                type: 'timeseries',
                time: {
                    'unit': 'month'
                },
                ...xScales
            },
            y: {
                title: {
                    display: true,
                    text: `Concentración ${pollutantUnit}`
                },
                ...yScales
            }
        }
    }
}

const getStationName = ({stations, stationId}) => {
    const [station] = stations.filter(s => s.id === stationId)
    return station.name
}

export const getCurrentDatasets = ({readings, stations, pollutantName}) => {
    const currentDatasets = []
    const colors = getColorPalette(stations.length)

    stations.forEach(({id}, idx) => {
        const stationName = getStationName({stationId: id,
            stations: stations})
        const stationReadings = readings[id]
        const currentValues = []
        stationReadings.forEach(o => {
            const xValueA = o.timestamp
            const xValueB = o.recorded_at
            const yValueA = o[pollutantName.toLowerCase()]
            const yValueB = o[pollutantName.toUpperCase()]
            const value = {
                x: xValueA || xValueB,
                y: yValueA || yValueB
            }
            currentValues.push(value)
        })
        currentDatasets.push({
            label: stationName,
            data: currentValues,
            backgroundColor: colors[idx],
        })
    })

    return currentDatasets
}

export const getChartPrimaryTitle = ({days}) => {
    const alternativeA = `Visualización de contaminantes para el último día`
    const alternativeB = `Visualización de contaminantes para los últimos ${days} días`
    const shouldUseAlternativeA = days === 1
    return shouldUseAlternativeA ? alternativeA : alternativeB
}

export const getChartSecondaryTitle = ({startDate, endDate}) => {
    const startDateString = moment(startDate).format('DD/MM/YYYY')
    const endDateString = moment(endDate).format('DD/MM/YYYY')
    return `Mediciones obtenidas entre ${startDateString} y ${endDateString}`
}