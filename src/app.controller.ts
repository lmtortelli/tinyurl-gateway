import { Controller, Get, Inject, Param, Post, Query, Req, Body, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Get(':keyUrl')
  @Redirect('lmtortelli.tech', 200)
  public readUrl(@Param("keyUrl") keyUrl) {
    return this.appService.getUrl(keyUrl).pipe(
      map ( (redirect_url : string) => ({url : redirect_url}) )
    );
  }

  @Post('')
  public createTinyUrl(@Req() req : Request, @Body("url") url : String) : Observable<{message : string}>{
    
    return this.appService.createTinyUrl(req, url);
  }
}
