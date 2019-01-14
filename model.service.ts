import { Injectable } from '@angular/core';

@Injectable()
export class ModelDataService {

    private pageModels = {};

    setPageModel(option, value) {
        sessionStorage.setItem(option, JSON.stringify(value));
        this.pageModels[option] = value;
    }

    getPageModel(option) {
        if (JSON.parse(sessionStorage.getItem(option))) {
            return JSON.parse(sessionStorage.getItem(option));
        }
        else {
            return undefined;
        }
    }
    getAllPageModel() {
        return this.pageModels;
    }

    emtyPageModel() {
        this.pageModels = {};
    }

    removeModel(option) {
        sessionStorage.removeItem(option)
    }
}
