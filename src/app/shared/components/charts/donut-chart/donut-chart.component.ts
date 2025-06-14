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
import { DonutChartshadowPlugin } from './donut-chart.plugin';

// Register all Chart.js components
Chart.register(...registerables);

export interface DonutChartSegment {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-donut-chart',
  standalone: false,
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() chartData: DonutChartSegment[] = [];
  @Input() title: string = '';
  @Input() centerText: string = '';
  @Input() centerSubtext: string = '';

  chart: Chart | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      this.updateChart();
    }
  }

  createChart(): void {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const data: ChartData = {
      labels: this.chartData.map((item) => item.label),
      datasets: [
        {
          data: this.chartData.map((item) => item.value),
          backgroundColor: this.chartData.map((item) => item.color),
          borderWidth: 0,
          hoverOffset: 1,
          borderRadius: 10,
        },
      ],
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data as ChartData<'doughnut'>,
      options: {
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        },
        datasets: {
          doughnut: {
            spacing: 6, // 👈 adds space between segments
          },
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 10,
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 14,
            },
            displayColors: true,
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                const total = context.dataset.data.reduce(
                  (sum: number, val: any) => sum + val,
                  0
                );
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
      plugins: [DonutChartshadowPlugin],
    };

    this.chart = new Chart(ctx, config);
  }

  updateChart(): void {
    if (!this.chart) {
      this.createChart();
      return;
    }

    console.log('Updating chart with new data:', this.chartData);

    this.chart.data.labels = this.chartData.map((item) => item.label);
    this.chart.data.datasets[0].data = this.chartData.map((item) => item.value);
    this.chart.data.datasets[0].backgroundColor = this.chartData.map(
      (item) => item.color
    );

    this.chart.update();
  }
}
