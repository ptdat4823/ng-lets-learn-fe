import { hexToRgba } from '@shared/helper/chart.helper';
import { Plugin } from 'chart.js';  

export const BarChartShadowPlugin: Plugin = {
  id: 'barShadow',
  afterDatasetDraw(chart: any, args: any, options: any) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(args.index);

    if (!meta.type || meta.type !== 'bar') return;

    ctx.save();

    meta.data.forEach((bar: any, i: any) => {
      const backgroundColor = bar.options.backgroundColor;
      // Set shadow properties
      ctx.shadowColor = hexToRgba(backgroundColor, 0.18);
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      // Draw the bar with shadow
      bar.draw(ctx);

      // Reset shadow after each bar
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });

    ctx.restore();
  },
};
