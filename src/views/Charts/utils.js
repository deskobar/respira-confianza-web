import moment from "moment";
import {colors} from "../../Constants";

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

const getColorDependingOnThreshold = ({value, thresholds}) => {
    // https://color-hex.org/color-palettes/187
    const {good, moderate, unhealthy, very_unhealthy, dangerous} = thresholds
    let color
    if (value < good){
        color = colors.LessThanGood
    } else if (value >= good && value < moderate){
        color = colors.BetweenGoodAndModerate
    } else if (value >= moderate && value < unhealthy){
        color = colors.BetweenModerateAndUnhealthy
    } else if (value >= unhealthy && value < very_unhealthy){
        color = colors.BetweenUnhealthyAndVeryUnhealthy
    } else if (value >= very_unhealthy && value < dangerous){
        color = colors.BetweenVeryUnhealthyAndDangerous
    } else {
        color = colors.MoreThanDangerous
    }
    return color
}

export const getCurrentDatasets = ({readings, stations, pollutantName, thresholds}) => {
    const currentDatasets = []

    stations.forEach(({id}) => {
        const stationName = getStationName({stationId: id,
            stations: stations})
        const stationReadings = readings[id]
        const currentValues = []
        const dotsColors = []
        stationReadings.forEach(o => {
            const xValueA = o.timestamp
            const xValueB = o.recorded_at
            const yValueA = o[pollutantName.toLowerCase()]
            const yValueB = o[pollutantName.toUpperCase()]
            const value = {
                x: xValueA || xValueB,
                y: yValueA || yValueB,
            }
            const currentColor = getColorDependingOnThreshold({
                value: value.y,
                thresholds: thresholds
            })
            dotsColors.push(currentColor)
            currentValues.push(value)
        })
        currentDatasets.push({
            label: stationName,
            data: currentValues,
            backgroundColor: dotsColors
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
