import {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Layout} from "antd";
import moment from "moment";
import "chartjs-adapter-moment";
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, LinearScale, LineElement, PointElement, TimeScale, Title} from 'chart.js';
import {getChartPrimaryTitle, getChartSecondaryTitle, getOptions} from "./utils";
import {getNDays} from "../../utils/chart";
import {getDatasets} from "./queries/pollutantByStation";

ChartJS.register(LineElement, PointElement, LinearScale, Title, TimeScale);

const {Content} = Layout;


export const ChartByTime = ({station, pollutant, daysQueryBy}) => {

    const [datasets, setDatasets] = useState([]);
    const [labels, setLabels] = useState([])

    const chartRef = useRef(null);

    const endDate = moment()
    const startDate = moment().subtract(daysQueryBy, 'days')

    const endDateISO = endDate.toISOString()
    const startDateISO = startDate.toISOString()

    const loadDatasets = (datasets) => {
        setDatasets(datasets)
    }

    useEffect(() => {
        const daysLabels = getNDays({n: daysQueryBy})
        setLabels(daysLabels)
    }, [daysQueryBy])

    useEffect(() => {
        const datasetsConfig = {
            pollutant: pollutant,
            station: station,
            startDate: startDateISO,
            endDate: endDateISO,
            groupByTime: daysQueryBy !== 1
        }
        getDatasets(datasetsConfig).then(loadDatasets)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pollutant, station, daysQueryBy])

    const chartOptions = getOptions({
        pollutantUnit: pollutant.unit,
        xScales: {
            min: startDate.valueOf(),
            max: endDate.valueOf()
        },
    })

    const ChartPollutants = useCallback(() => <StyledChart
        data={{
            labels: labels,
            datasets: datasets
        }}
        options={chartOptions}
        ref={chartRef}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    />, [labels, datasets])

    const primaryTitle = getChartPrimaryTitle({days: daysQueryBy})
    const secondaryTitle = getChartSecondaryTitle({startDate: startDate, endDate: endDate})

    return <>
        <StyledContent>
            <h1>{primaryTitle}</h1>
            <h2>{secondaryTitle}</h2>
            <>
                <ChartPollutants />
            </>
        </StyledContent>
    </>
}

const StyledChart = styled(Line)`
  align-self: center;
  max-width: 90%;
  padding-left: 5%;
`

const StyledContent = styled(Content)`
  padding-top: 3vh;
  text-align: center;

  h1 {
    font-size: 36px;
  }
`
