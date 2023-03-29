import React, { useEffect, useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";


const DISPLAY = true;
const BORDER = true;
const CHART_AREA = true;
const TICKS = true;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);


const Graph6 = () => {
  const [data, setData] = useState([]);
  const [kospiIndex, setKospiIndex] = useState([]);


  useEffect(() => {
    
    const getData = async () => {
      let tempArray = [];
      const dateList = [{s:'201501', e:'201512'}, {s:'201601', e:'201612'}, {s:'201701', e:'201712'}, {s:'201801', e:'201812'}, {s:'201901', e:'201912'}, {s:'202001', e:'202012'}
        , {s:'202101', e:'202112'}, {s:'202201', e:'202212'}, {s:'202301', e:'202312'}];
      // const dateList = [{s:'202101', e:'202112'}, {s:'202201', e:'202212'}, {s:'202301', e:'202312'}];
      
      for (const d of dateList) {
        
        let response = await axios.get(
          `https://apis.data.go.kr/1220000/Newtrade/getNewtradeList?serviceKey=zwqG4%2FTWi%2FB15yaYJgvc10TbN1y81Bd86BBa6Gn2rrr6FLkl%2FGSxWO75VTMrm4KjxBKGrVqhLOTWdue6yzY%2BuQ%3D%3D&strtYymm=${d.s}&endYymm=${d.e}`);
          console.log(d);
  
        let dataArr = new XMLParser().parseFromString(response.data).children;
        console.log(dataArr[1].children[0].children.pop());
        tempArray = [...tempArray, ...dataArr[1].children[0].children];
  
        console.log(tempArray);
        setData(tempArray);
      };

      const response1 = await axios.get(
        "https://ecos.bok.or.kr/api/StatisticSearch/UWANNVLD949PL12CQV0D/JSON/kr/1/100/902Y002/M/201501/202312/3010101");
      
      setKospiIndex(response1.data.StatisticSearch.row);

    };
    getData();
  }, []);


  const processedData = {
    // labels: data.map((item) => item.prdDe),
    labels: data.map((item) => item.children[5].value),
    datasets: [
      {
        label: "일평균 수출금액",
        // data: data.map((item) => Number(item.val)),
        data: data.map((item) => Number(item.children[2].value)/20/1000000),
        fill: true,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        borderColor: "#001010",
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
          color: "#001010",
          font: {
            size: '16',
            weight: 'bold'
          },
          text: '일평균 수출금액(백만달러/일)'
        },
        suggestedMin: 0,
        suggestedMax: 3500,
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
        suggestedMin: 0,
        suggestedMax: 3500,
        position: 'right',
        grid: {
          color: "#E3E3E3",
        }
      },

    }
  };


  return (
    <div style={{margin: 50}}>
      <h5>일평균 수출금액 vs 종합주가지수</h5>
      <Line options={options} data={processedData} />
    </div>
  );
};

export default Graph6;
