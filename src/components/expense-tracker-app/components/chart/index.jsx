import Chart from 'react-apexcharts';

const options = {
    labels: ["Income", "Expense"],
    colors: ['rgb(49, 130, 206)', 'rgb(255, 0, 0)'],
    chart: {
        width: "50px"
    },
    states: {
        hover: {
            filter: {
                type: "none"
            }
        }
    }, legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
        donut: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: false,
                }
            }
        }
    },
    fill: {
        color: ['rgb(49, 130, 206)', 'rgb(255, 0, 0)']
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: 'rgb(0, 0, 0)',
        }
    }
};

export default function TransactionChartSummary({ expense = 100, income = 100 }) {

    return (
        <Chart 
        options={options}
        series={[income, expense]}
        type='pie'
        width={'100%'}
        heigth={'100%'}
        />
    );
}