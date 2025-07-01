import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { BarChartShadowPlugin } from './bar-chart-shadow.plugin';
import { BarChartLabelPlugin } from './bar-chart-label.plugin';

Chart.register(...registerables);

export interface BarChartSegment {
  value: number;
  color: string;
  label: string;
}

@Component({
  selector: 'app-bar-chart',
  standalone: false,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() segments: BarChartSegment[] = [];
  @Input() title: string = '';
  @Input() maxValue?: number;

  chart: Chart | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Fix: listen for changes to 'segments', not 'chartData'
    if (changes['segments'] && !changes['segments'].firstChange) {
      this.updateChart();
    }
  }

  createChart(): void {
    if (!this.chartCanvas) return;
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Use user-provided maxValue if available, otherwise use the highest value
    const rawMax = Math.max(...this.segments.map((s) => s.value), 1);
    let computedMax: number;
    if (this.maxValue && this.maxValue > 0) {
      computedMax = this.maxValue;
    } else {
      computedMax = rawMax;
    }

    const data: ChartData<'bar'> = {
      labels: this.segments.map((s) => s.label),
      datasets: [
        {
          label: this.title,
          data: this.segments.map((s) => s.value),
          backgroundColor: this.segments.map((s) => s.color),
          borderRadius: 4,
          barThickness: 16,
          categoryPercentage: 1.0,
          barPercentage: 1.0,
          grouped: false,
        },
        {
          label: 'Maximum value',
          data: this.segments.map(() => computedMax),
          backgroundColor: '#e5e7eb',
          borderRadius: 4,
          barThickness: 16,
          categoryPercentage: 1.0,
          barPercentage: 1.0,
          grouped: false,
        },
      ],
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 10,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 14 },
            displayColors: true,
            // Only show tooltip for the background bar (datasetIndex 0)
            filter: (tooltipItem) => tooltipItem.datasetIndex === 0,
          },
        },
        scales: {
          x: {
            grid: { color: '#eee' },
            ticks: { color: '#888', font: { size: 13 } },
            min: 0,
            max: computedMax,
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
          },
        },
      },
      plugins: [BarChartShadowPlugin, BarChartLabelPlugin],
    };

    this.chart = new Chart(ctx, config);
  }

  updateChart(): void {
    if (!this.chart) {
      this.createChart();
      return;
    }
    const rawMax = Math.max(...this.segments.map((s) => s.value), 1);
    let computedMax: number;
    if (this.maxValue && this.maxValue > 0) {
      computedMax = this.maxValue;
    } else {
      computedMax = rawMax;
    }
    // Update labels and both datasets
    this.chart.data.labels = this.segments.map(s => s.label);
    (this.chart.data.datasets[0].data as number[]) = this.segments.map(s => s.value);
    (this.chart.data.datasets[0].backgroundColor as string[]) = this.segments.map(s => s.color);
    (this.chart.data.datasets[1].data as number[]) = this.segments.map(() => computedMax);
    this.chart.options.scales = {
      ...this.chart.options.scales,
      x: {
        ...this.chart.options.scales && this.chart.options.scales['x'],
        min: 0,
        max: computedMax,
      },
    };
    this.chart.update();
  }
}
