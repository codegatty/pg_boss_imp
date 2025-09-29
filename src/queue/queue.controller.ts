import { Body, Controller,Post,Get, Query, Param } from '@nestjs/common';
import { QueueService } from './queue.service';
import { NewEquipment } from './NewEquipment.dto';
import { RearrangeData } from './RearrangeData.dto';

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

    @Get('all')
    getQueueData(){
        return this.queueService.getQueueData('HeavyQueue')
    }

    @Get('sort')
    sortQueueData(){
        return this.queueService.getQueueData('HeavyQueue')
    }

    @Post('rearrange')
    rearrangeQueueData(@Body()data:Array<RearrangeData>){
        return this.queueService.rearrangeQueueData('HeavyQueue',data);
    }
}
