import { Box, Title, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import Chart from "react-apexcharts";
import PageHeader from "../../components/PageHeader";
import { useStyles } from "./styles";

export const Dashboard = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [saleData, setSaleData] = useState({
    series: [
      {
        name: "Boys",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Girls",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Toys & Games",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "Accessories",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        // toolbar: {
        //   show: true,
        // },
        // zoom: {
        //   enabled: true,
        // },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 10,
      },
      fill: {
        opacity: 1,
      },
      colors: [
        theme.colors.primary[0],
        theme.colors.primary[2],
        theme.colors.primary[4],
        theme.colors.primary[6],
        theme.colors.primary[8],
      ],
    },
  });
  const [revenueData, setRevenueData] = useState({
    series: [
      {
        name: "Boys",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Girls",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Toys & Games",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "Accessories",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        // toolbar: {
        //   show: true,
        // },
        // zoom: {
        //   enabled: true,
        // },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 10,
      },
      fill: {
        opacity: 1,
      },
      colors: [
        "rgba(129, 209, 229, 1)",
        "rgba(129, 209, 229, 0.8)",
        "rgba(129, 209, 229, 0.6)",
        "rgba(129, 209, 229, 0.4)",
        "rgba(129, 209, 229, 0.2)",
      ],
    },
  });
  return (
    <Box className={classes.main}>
      <PageHeader label={"Dashboard"} />
      <Box className={classes.graph}>
        <Chart
          options={saleData.options}
          series={saleData.series}
          type="bar"
          // width="500"
          height="400px"
        />
        <Title order={3} align="center">
          Sale Graph (Units)
        </Title>
      </Box>
      <Box className={classes.graph}>
        <Chart
          options={revenueData.options}
          series={revenueData.series}
          type="bar"
          // width="500"
          height="400px"
        />
        <Title order={3} align="center">
          Revenue Graph (PKR)
        </Title>
      </Box>
    </Box>
  );
};
