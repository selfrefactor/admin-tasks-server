import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios'
import { wait } from 'rambdax';

@Controller('cors')
export class CorsController {
  @Post('')
  async cors(  @Body() input: any) {
    const [result, err] = await wait(axios.get(input.url)) 
    if(err) return {err, data: null}

    return {data: result.data, err: null}
  }
}
