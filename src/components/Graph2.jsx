import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DISPLAY = true;
const BORDER = true;
const CHART_AREA = true;
const TICKS = true;



const Graph2 = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [kospiIndex, setKospiIndex] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        // "https://kosis.kr/openapi/indIdDetailSearchRequest.do?method=getList&apiKey=ZjU4Y2EwZDM4YzdhZWYxM2ZiYTk0ZTg0OTFmNTJlYmI=&format=json&jipyoId=403&strtPrdDe=201801&endPrdDe=202312&service=4&numOfRows=100&pageNo=1&serviceDetail=indIdDetail&jsonVD=Y");
        "https://ecos.bok.or.kr/api/StatisticSearch/UWANNVLD949PL12CQV0D/JSON/kr/1/1000/902Y006/M/200501/202312/KR");

      // console.log(response.data);
      setData(response.data.StatisticSearch.row);


      const response2 = await axios.get(
        // "https://kosis.kr/openapi/indIdDetailSearchRequest.do?method=getList&apiKey=ZjU4Y2EwZDM4YzdhZWYxM2ZiYTk0ZTg0OTFmNTJlYmI=&format=json&jipyoId=403&strtPrdDe=201801&endPrdDe=202312&service=4&numOfRows=100&pageNo=1&serviceDetail=indIdDetail&jsonVD=Y");
        "https://ecos.bok.or.kr/api/StatisticSearch/UWANNVLD949PL12CQV0D/JSON/kr/1/1000/902Y006/M/200501/202312/US");

      // console.log(response.data);
      setData2(response2.data.StatisticSearch.row);


      const response1 = await axios.get(
        // "http://ecos.bok.or.kr/api/StatisticSearch/UWANNVLD949PL12CQV0D/JSON/kr/1/1000/901Y014/M/201801/202312/1070000"
        "https://ecos.bok.or.kr/api/StatisticSearch/UWANNVLD949PL12CQV0D/JSON/kr/1/1000/902Y002/M/200501/202312/3010101");

      setKospiIndex(response1.data.StatisticSearch.row);

    };
    getData();
  }, []);


  const processedData = {
    labels: data.map((item) => item.TIME),
    datasets: [
      {
        label: "한국정책금리",
        data: data.map((item) => Number(item.DATA_VALUE)),
        fill: true,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        borderColor: "#00FF00",
        yAxisID: 'y',
      },
      {
        label: "미국정책금리",
        data: data2.map((item) => Number(item.DATA_VALUE)),
        fill: true,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        borderColor: "#0000FF",
        yAxisID: 'y',
      },
      {
        label: "KOSPI",
        data: kospiIndex.map((item) => Number(item.DATA_VALUE)),
        fill: true,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        borderColor: "#FF0000",
        yAxisID: 'y1',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },

    scales: {
      x: {
        title: {
          display: true,
          font: {
            size: '16',
            weight: 'bold'
          },
          text: 'Date'
        },
        border: {
          display: BORDER
        },
        grid: {
          display: DISPLAY,
          drawOnChartArea: CHART_AREA,
          drawTicks: TICKS,
        }
      },

      y: {
        title: {
          display: true,
          color: "#0000FF",
          font: {
            size: '16',
            weight: 'bold'
          },
          text: '정책금리'
        },
        suggestedMin: 0,
        suggestedMax: 5,
        position: 'left',
        grid: {
          color: "#E3E3E3",
        }
      },

      y1: {
        title: {
          display: true,
          color: "#FF0000",
          font: {
            size: '16',
            weight: 'bold'
          },
          text: '종합주가지수'
        },
        suggestedMin: 1600,
        suggestedMax: 3400,
        position: 'right',
        grid: {
          color: "#E3E3E3",
        }
      },

    }
  };


  return (
    <div style={{margin: 50}}>
      <h5>정책금리(한국, 미국) vs 종합주가지수</h5>
      <Line options={options} data={processedData} />
    </div>
  );
};

export default Graph2;
