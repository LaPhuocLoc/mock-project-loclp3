import { AfterViewInit, Component } from '@angular/core';

declare const SwaggerUIBundle: any;
declare const SwaggerUIStandalonePreset: any;

@Component({
  selector: 'app-swagger-ui',
  standalone: true,
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.css'],
})
export class SwaggerUiComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    SwaggerUIBundle({
      url: 'assets/openapi.yaml',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: 'BaseLayout',
      docExpansion: 'list',
      operationsSorter: 'alpha'
    });
  }
}
