import { Plugin } from 'chart.js';

export const BarChartLabelPlugin: Plugin = {
  id: 'barLabels',
  beforeDatasetsDraw(chart) {
    const { ctx } = chart;
    const datasetMeta = chart.getDatasetMeta(0);
    const labels = chart.data.labels ?? [];

    ctx.save();
    ctx.font = 'bold 14px Nunito';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#6B7280';

    datasetMeta.data.forEach((bar, i) => {
      const { y } = bar.getProps(['y'], true);
      const label = labels[i] as string;
      const labelX = chart.chartArea.left;
      const labelY = y - 16;
      ctx.fillText(label, labelX, labelY);
    });

    ctx.restore();
  },
};
