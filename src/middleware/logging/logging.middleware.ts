import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    this.logger.log(`
      Incoming Request: ${method} ${originalUrl} 
      - IP: ${ip};
      - User-Agent: ${userAgent} 
      `);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const duration = Date.now() - startTime;
      
      this.logger.log(`
        Outgoing Response: ${method} ${originalUrl} 
        - Status: ${res.statusCode}; 
        - Content-Length: ${res.get('content-length') || 0}; 
        - Duration: ${duration}ms
        `);
        if (res.statusCode >= 400) {
          this.logger.error(`Error Response: ${method} ${originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`);
        }
      })


      res.on('error',(error:Error)=>{
        this.logger.error(`Response Error: ${method} ${originalUrl} - Error: ${error.message}`);
      })

      res.on('timeout',()=>{
        this.logger.error(`Response Timeout: ${method} ${originalUrl} - Duration: ${Date.now() - startTime}ms`);
      })

    next();
  }
}
