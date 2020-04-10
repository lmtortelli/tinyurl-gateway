import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "READ_URL_API",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8081
        }
      },{
        name: "CREATE_TINYURL_API",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8082
      }
    }
    ]),
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
