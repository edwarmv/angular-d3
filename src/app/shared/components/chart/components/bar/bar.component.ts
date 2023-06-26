import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent implements AfterViewInit {
  @ViewChild('container') elementRef?: ElementRef<HTMLElement>;

  private data = [
    {
      letter: 'A',
      frequency: 0.08167,
    },
    {
      letter: 'B',
      frequency: 0.01492,
    },
    {
      letter: 'C',
      frequency: 0.02782,
    },
    {
      letter: 'D',
      frequency: 0.04253,
    },
    {
      letter: 'E',
      frequency: 0.12702,
    },
    {
      letter: 'F',
      frequency: 0.02288,
    },
    {
      letter: 'G',
      frequency: 0.02015,
    },
    {
      letter: 'H',
      frequency: 0.06094,
    },
    {
      letter: 'I',
      frequency: 0.06966,
    },
    {
      letter: 'J',
      frequency: 0.00153,
    },
    {
      letter: 'K',
      frequency: 0.00772,
    },
    {
      letter: 'L',
      frequency: 0.04025,
    },
    {
      letter: 'M',
      frequency: 0.02406,
    },
    {
      letter: 'N',
      frequency: 0.06749,
    },
    {
      letter: 'O',
      frequency: 0.07507,
    },
    {
      letter: 'P',
      frequency: 0.01929,
    },
    {
      letter: 'Q',
      frequency: 0.00095,
    },
    {
      letter: 'R',
      frequency: 0.05987,
    },
    {
      letter: 'S',
      frequency: 0.06327,
    },
    {
      letter: 'T',
      frequency: 0.09056,
    },
    {
      letter: 'U',
      frequency: 0.02758,
    },
    {
      letter: 'V',
      frequency: 0.00978,
    },
    {
      letter: 'W',
      frequency: 0.0236,
    },
    {
      letter: 'X',
      frequency: 0.0015,
    },
    {
      letter: 'Y',
      frequency: 0.01974,
    },
    {
      letter: 'Z',
      frequency: 0.00074,
    },
  ];
  width = 928;
  height = 500;
  marginTop = 30;
  marginRight = 0;
  marginBottom = 30;
  marginLeft = 40;

  ngAfterViewInit(): void {
    if (!this.elementRef) {
      throw Error('Container does not exist');
    }
  }

  create() {
    const data = this.data.values();
    // Declare the x (horizontal position) scale.
    const x = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          this.data,
          ([d]) => -d.frequency,
          (d) => d.letter
        )
      ) // descending frequency
      .range([this.marginLeft, this.width - this.marginRight])
      .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)])
      .range([this.height - this.marginBottom, this.marginTop]);

    // Create the SVG container.
    const svg = d3
      .create('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', [0, 0, this.width, this.height])
      .attr('style', 'max-width: 100%; height: auto;');

    // Add a rect for each bar.
    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll()
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.letter))
      .attr('y', (d) => y(d.frequency))
      .attr('height', (d) => y(0) - y(d.frequency))
      .attr('width', x.bandwidth());

    // Add the x-axis and label.
    svg
      .append('g')
      .attr('transform', `translate(0,${this.height - this.marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add the y-axis and label, and remove the domain line.
    svg
      .append('g')
      .attr('transform', `translate(${this.marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', -this.marginLeft)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('↑ Frequency (%)')
      );

    // Return the SVG element.
    return svg.node();
  }
}
