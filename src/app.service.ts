import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ReadDto } from 'url-dto/read-api/ReadDto';
import { Request } from 'express';
import { map } from "rxjs/operators";


@Injectable()
export class AppService {

  constructor(
    @Inject("READ_URL_API") private readonly readApi: ClientProxy,
    @Inject("CREATE_TINYURL_API") private readonly createTinyUrlApi: ClientProxy
  ) {}

  public getUrl(keyUrl : string): Observable<string> {
    
    const payload = { keyUrl } as ReadDto;

    return this.readApi
          .send<string>("read_url", payload)
        
  }

  public createTinyUrl(req : Request, url : String)  {
    return this.createTinyUrlApi.send<string>("create_tinyurl", url)
      .pipe(
        map((message: string) => ({ message : req.host + "/" + message}))
      );
    
  }

}
