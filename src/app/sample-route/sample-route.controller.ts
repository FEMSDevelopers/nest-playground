import { Controller, Get } from '@nestjs/common';
import { SampleRouteService } from './sample-route.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllExceptionsResponse } from '../app.dto';
import { SampleModel } from './_models/sample.model';

@ApiTags('Sample Route')
@Controller('/sample-route')
@ApiNotFoundResponse({ type: AllExceptionsResponse })
@ApiInternalServerErrorResponse({ type: AllExceptionsResponse })
export class SampleRouteController {
  constructor(private sampleRouteService: SampleRouteService) {}

  @ApiResponse({ status: 200, type: SampleModel, isArray: true })
  @Get('/')
  public async listActiveAlerts() {
    return this.sampleRouteService.getAlerts();
  }
}
