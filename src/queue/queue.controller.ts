import { Body, Controller,Post,Get } from '@nestjs/common';
import { QueueService } from './queue.service';
import { NewEquipment } from './NewEquipment.dto';

@Controller('queue')
export class QueueController {
    constructor( private readonly queueService:QueueService){}

    @Post('add')
    sendNewEquipment(@Body() data:NewEquipment){
        this.queueService.insertTask(data);
        return {message:'Add the new Task'};
    }

    @Get('get')
    getQueueItem(){
        return this.queueService.getQueueItem('HeavyQueue');
    }


}
