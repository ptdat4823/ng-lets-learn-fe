import { hexToRgba } from '@shared/helper/chart.helper';
import { Plugin } from 'chart.js';

export const DonutChartshadowPlugin: Plugin = {
  id: 'segmentShadow',
  beforeDatasetDraw(chart: any, args: any, options: any) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(args.index);

    if (!meta.type || meta.type !== 'doughnut') return;

    ctx.save();

    meta.data.forEach((arc: any, i: any) => {
      const backgroundColor = arc.options.backgroundColor;

      // Set shadow properties
      ctx.shadowColor = hexToRgba(backgroundColor, 0.6);
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;

      // Draw the arc with shadow
      arc.draw(ctx);

      // Reset shadow after each arc
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });

    ctx.restore();

    // Prevent Chart.js from re-drawing the dataset again
    return false;
  },
};
