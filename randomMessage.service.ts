import { Injectable } from '@angular/core';

@Injectable()
export class RandomMessageService {

    private pageModels = {};

    msg() {
        let message = [
         "We’re almost there. Thank you for your patience",
         "Your time is precious, we will make sure it’s worth waiting",
         "Our job is to give you the best solution. Thank you for your patience",
         "Just a few more seconds and we are good to go. ",
         "A little more time will make it work. Thank you for being there. ",
         "We are busy backend, so that the best thing can come up for you",
         "Please be with us till we come up with the result. "
        ];

        let a = Math.floor(Math.random() * message.length);
        return message[a];
    }

}
