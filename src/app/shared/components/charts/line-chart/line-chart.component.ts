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

Chart.register(...registerables);

export interface LineChartItem {
  label: string;
  data: number[];
  color: string;
}

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() chartData: LineChartItem[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = '';
  @Input() centerText: string = '';
  @Input() centerSubtext: string = '';

  chart: Chart | null = null;

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

    const data: ChartData<'line'> = {
      labels: this.labels,
      datasets: this.chartData.map((item) => ({
        label: item.label,
        data: item.data,
        borderColor: item.color,
        backgroundColor: item.color + '33', // 20% opacity
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: item.color,
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        borderWidth: 2,
      })),
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        },
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
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#888',
              font: { size: 13 },
            },
          },
          y: {
            grid: {
              color: '#eee',
            },
            ticks: {
              color: '#888',
              font: { size: 13 },
            },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  updateChart(): void {
    if (!this.chart) {
      this.createChart();
      return;
    }
    this.chart.data.labels = this.labels;
    this.chart.data.datasets = this.chartData.map((item) => ({
      label: item.label,
      data: item.data,
      borderColor: item.color,
      backgroundColor: item.color + '33',
      tension: 0.4,
      fill: false,
      pointRadius: 4,
      pointBackgroundColor: item.color,
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
      borderWidth: 2,
    }));
    this.chart.update();
  }
}